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
import { setItems } from "../../store/slices/purchaseOrder";

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
  rows: { id: string; dateReceived: Date; quantityReceived: number }[];
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
  const uuid = useAppSelector((state) => state.deliveryModal.targetUuid);
  const items = useAppSelector((state) => state.purchaseOrder.items);
  if (!uuid || !items) return null;
  const item = items[uuid];

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parcels, setParcels] = useState<number[]>([]);
  const [thresholdChecked] = useState<boolean>(!!item?.threshold);
  const [dateValue, setDateValue] = useState<Dayjs | PickerValue>(
    dayjs(new Date().toLocaleString())
  );

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
    onSuccess: (res) => {
      const clone = structuredClone(items);
      clone[uuid].deliveries = res.data.rows;
      clone[uuid].quantityReceived = clone[uuid].deliveries.reduce(
        (total, delivery) => total + delivery.quantityReceived,
        0
      );

      dispatch(setItems(clone));
      dispatch(setShowModal(false));
    },
    onError: (err) => {
      console.error(err);
      setError("Error submitting delivery, please contact Michael");
    },
  });

  const handleClose = () => {
    setOpen(false);
    dispatch(setShowModal(false));
  };

  const submitDeliveries = async () => {
    if (!item || !uuid) return;
    setError("");

    const total = parcels.reduce((a, b) => a + b, 0);
    if (!parcels.length || (item.quantity - total < 0 && !thresholdChecked)) {
      setError("Parcels are empty or threshold is not checked");
      return;
    }

    addDeliveryMutation.mutateAsync({
      poNumber: poName,
      deliveries: parcels,
      uuid: uuid,
      partNumber: item.partNumber,
      date: dateValue,
    });
  };

  if (!item) return null;

  if (!items || Object.keys(items).length === 0) {
    return (
      <Typography variant="body2" color="error">
        Error selecting items
      </Typography>
    );
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-add-part-delivery"
        aria-describedby="modal-register-delivery"
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
              Part: {item.partNumber}
            </Typography>

            <ThresholdCheckbox />

            <DeliveryDate value={dateValue} setValue={setDateValue} />

            <AddDeliveryField setError={setError} parcels={parcels} setParcels={setParcels} />

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
