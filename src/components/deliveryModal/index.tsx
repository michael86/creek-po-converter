import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, FormGroup } from "@mui/material";
import DeliveryDate from "./DeliveryDate";
import AddDeliveryField from "./AddDeliveryField";
import dayjs, { Dayjs } from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";
import api from "../../api";
import { useAppSelector } from "../../store";
import { Items } from "../../types/state/purchaseOrders";
import { useMutation } from "@tanstack/react-query";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  row: Items;
  poName: string;
  refetch: () => void;
};

interface AddDeliveryResponse {
  status: number;
  message: string;
}

interface AddDeliveryPayload {
  poNumber: string;
  deliveries: number[];
  uuid: string;
  partNumber: string;
  date: Dayjs | PickerValue;
}

const DeliveryModal: React.FC<Props> = ({ setShowModal, row, poName, refetch }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parcels, setParcels] = useState<number[]>([]);
  const [thresholdChecked, setThresholdChecked] = useState<boolean>(!!row.threshold);

  const [dateValue, setDateValue] = useState<Dayjs | PickerValue>(
    dayjs(new Date().toLocaleString())
  );

  const rows = useAppSelector((state) => state.purchaseOrder.items);
  if (!rows?.length) {
    return (
      <Typography variant="body2" color="danger">
        Error selecting items
      </Typography>
    );
  }

  useEffect(() => setOpen(true), []);

  const addDeliveryMutation = useMutation<
    AxiosResponse<AddDeliveryResponse>,
    Error,
    AddDeliveryPayload
  >({
    mutationFn: (payload: AddDeliveryPayload) =>
      api.post<AddDeliveryResponse>("deliveries/add", {
        ...payload,

        date: (payload.date as Dayjs).toISOString(),
      }),
    onSuccess: () => {
      refetch();
      setShowModal(false);
    },
    onError: () => {
      setError("Error submitting delivery, please contact Michael");
    },
  });

  const handleClose = () => {
    setOpen(false);
    setShowModal(false);
  };

  const submitDeliveries = async () => {
    setError("");

    try {
      if (
        !parcels.length ||
        (row.quantity - parcels.reduce((a, b) => a + b, 0) < 0 && !thresholdChecked)
      ) {
        setError("Parcels are empty or threshold is not checked");
        return;
      }

      addDeliveryMutation.mutate({
        poNumber: poName,
        deliveries: parcels,
        uuid: row.id,
        partNumber: row.partNumber,
        date: dateValue,
      });
    } catch (error) {
      setError("Error submitting delivery, please contact Michael");
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-add-part-delivery"
        aria-describedby="modal-register-delviery"
      >
        <Box sx={style}>
          <FormGroup>
            {error && (
              <Typography variant="h5" align="center" color="red" gutterBottom>
                {error}
              </Typography>
            )}
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "20px" }}
            >
              Part: {row.partNumber}
            </Typography>

            <DeliveryDate value={dateValue} setValue={setDateValue} />

            <AddDeliveryField
              setError={setError}
              quantitiyToReceive={row.quantity}
              parcels={parcels}
              setParcels={setParcels}
              thresholdChecked={thresholdChecked}
              setThresholdChecked={setThresholdChecked}
              uuid={row.id}
            />

            <Button variant="contained" onClick={submitDeliveries}>
              Submit Delivery
            </Button>
          </FormGroup>
        </Box>
      </Modal>
    </div>
  );
};

export default DeliveryModal;
