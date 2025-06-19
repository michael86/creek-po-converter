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
import { useAppDispatch, useAppSelector } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { setShowModal } from "../../store/slices/deliveryModal";
import ThresholdCheckbox from "./ThresholdCheckbox";

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
  poName: string;
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

const DeliveryModal: React.FC<Props> = ({ poName }) => {
  const dispatch = useAppDispatch();
  const row = useAppSelector((state) => state.purchaseOrder.selectedItem);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parcels, setParcels] = useState<number[]>([]);

  // const [thresholdChecked, setThresholdChecked] = useState<boolean>(!!row.threshold);

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
      dispatch(setShowModal(false));
    },
    onError: () => {
      setError("Error submitting delivery, please contact Michael");
    },
  });

  const handleClose = () => {
    setOpen(false);
    dispatch(setShowModal(false));
  };

  const submitDeliveries = async () => {
    if (!row) return;
    setError("");

    try {
      if (
        !parcels.length ||
        (row.quantity - parcels.reduce((a, b) => a + b, 0) < 0 && !row.thresholdChecked)
      ) {
        setError("Parcels are empty or threshold is not checked");
        return;
      }

      addDeliveryMutation.mutate({
        poNumber: poName,
        deliveries: parcels,
        uuid: row.itemUuid,
        partNumber: row.name,
        date: dateValue,
      });
    } catch (error) {
      setError("Error submitting delivery, please contact Michael");
      console.error(error);
    }
  };

  if (!row) return null;

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
              Part: {row.name}
            </Typography>

            <ThresholdCheckbox />

            <DeliveryDate value={dateValue} setValue={setDateValue} />

            <AddDeliveryField
              setError={setError}
              quantitiyToReceive={row.quantity}
              parcels={parcels}
              setParcels={setParcels}
              thresholdChecked={!!row.thresholdChecked}
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
