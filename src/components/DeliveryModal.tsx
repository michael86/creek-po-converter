import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { createData } from "../utils/table";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Button, List, TextField } from "@mui/material";

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
  const [dateValue, setDateValue] = useState<Dayjs>(dayjs(new Date().toLocaleString()));
  const [parcels, setParcels] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [parcelTotal, setParcelTotal] = useState(0);
  const parcelRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setOpen(true), []);

  const handleClose = () => {
    setOpen(false);
    setShowModal(false);
  };

  const addParcel = () => {
    setError(null);
    const quantity = parseInt(parcelRef.current?.value || "0");
    if (!quantity || quantity <= 0) {
      setError("Enter a valid quantity");
      return;
    }

    //quantity to receive is how many parcels we are expecting. The calling parent should already have done the deductions for any previous parcels recieved
    //leaving us with exactly how many we are expecting at the current time. So we now reduce the parcels array and add on this
    // new parcel to ensure we're under or equal to the amount expected

    const parcelsReceived = parcels.reduce((a, b) => a + b, 0) + quantity;
    if (quantitiyToReceive - parcelsReceived < 0) {
      setError("To many items received, do your maths");
      return;
    }
    setParcels([...parcels, quantity]);
    setParcelTotal(parcelsReceived);
    parcelRef.current!.value = "";
  };

  const deleteParcel = (index: number) => {
    parcels.splice(index, 1);
    setParcels([...parcels]);
    setParcelTotal(parcels.reduce((a, b) => a + b, 0));
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

          <DateTimePicker label="Date and time received" value={dateValue} />

          <TextField
            type="number"
            variant="filled"
            label={"quantity received"}
            inputRef={parcelRef}
            sx={{ marginTop: "20px" }}
          />

          <Button variant="contained" onClick={addParcel} sx={{ marginTop: "20px" }}>
            Add Parcel
          </Button>

          {parcels.length > 0 && (
            <>
              <List sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                {parcels.map((parcel, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 1,
                      padding: "4px 8px",
                      minWidth: 40,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: "primary.dark", // or use theme value like "primary.light"
                      },
                    }}
                    onClick={() => deleteParcel(index)}
                  >
                    {parcel}
                  </Box>
                ))}
              </List>
              <Typography variant="body2">Parcel Total: {parcelTotal}</Typography>
            </>
          )}

          <Button variant="contained">Submit Delivery</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeliveryModal;
