import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { createData } from "../../utils/table";
import { useEffect, useState } from "react";
import { Button, FormGroup } from "@mui/material";
import DeliveryDate from "./DeliveryDate";
import AddDeliveryField from "./AddDeliveryField";
import dayjs, { Dayjs } from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";
import api from "../../api";

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
  row: ReturnType<typeof createData>;
  quantitiyToReceive: number;
};

const DeliveryModal: React.FC<Props> = ({ setShowModal, row, quantitiyToReceive }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parcels, setParcels] = useState<number[]>([]);
  const [thresholdChecked, setThresholdChecked] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Dayjs | PickerValue>(
    dayjs(new Date().toLocaleString())
  );

  useEffect(() => setOpen(true), []);

  const handleClose = () => {
    setOpen(false);
    setShowModal(false);
  };

  const submitDeliveries = async () => {
    setError("");

    try {
      if (
        !parcels.length ||
        (quantitiyToReceive - parcels.reduce((a, b) => a + b, 0) < 0 && !thresholdChecked)
      ) {
        setError("Parcels are empty or threshold is not checked");
        return;
      }

      const res = await api.post("deliveries/add", {
        parcels,
        partUuid: row.id,
        partNumber: row.name,
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
              Part: {row.name}
            </Typography>

            <DeliveryDate value={dateValue} setValue={setDateValue} />

            <AddDeliveryField
              setError={setError}
              quantitiyToReceive={quantitiyToReceive}
              parcels={parcels}
              setParcels={setParcels}
              thresholdChecked={thresholdChecked}
              setThresholdChecked={setThresholdChecked}
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
