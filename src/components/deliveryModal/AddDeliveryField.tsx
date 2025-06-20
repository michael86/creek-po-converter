import { Box, Button, List, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAppSelector } from "../../store";

type Props = {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  parcels: number[];
  setParcels: React.Dispatch<React.SetStateAction<number[]>>;
};

const AddDeliveryField: React.FC<Props> = ({ parcels, setParcels, setError }) => {
  const parcelRef = useRef<HTMLInputElement | null>(null);
  const [parcelTotal, setParcelTotal] = useState(0);

  const targetUuid = useAppSelector((state) => state.deliveryModal.targetUuid);
  const items = useAppSelector((state) => state.purchaseOrder.items);
  if (!targetUuid || !items) return null;

  const item = items?.[targetUuid] || null;
  if (!item) return null;

  const { quantity, threshold, quantityReceived } = item;
  const thresholdChecked = !!threshold;
  const quantityToReceive = quantity - quantityReceived;

  const addParcel = () => {
    setError(null);
    const quantity = parseInt(parcelRef.current?.value || "0");

    if (!quantity || quantity <= 0) {
      setError("Enter a valid quantity");
      return;
    }

    const parcelsReceived = parcels.reduce((a, b) => a + b, 0) + quantity;

    if (!thresholdChecked && quantityToReceive - parcelsReceived < 0) {
      setError(
        "You've met the amount expected. If this is extra, please check the threshold checkbox for this item."
      );
      return;
    }

    setParcels([...parcels, quantity]);
    setParcelTotal(parcelsReceived);
    parcelRef.current!.value = "";
  };

  const deleteParcel = (index: number) => {
    const updatedParcels = parcels.filter((_, i) => i !== index);
    setParcels(updatedParcels);
    setParcelTotal(updatedParcels.reduce((a, b) => a + b, 0));
  };

  return (
    <>
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
                    backgroundColor: "primary.dark",
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
    </>
  );
};

export default AddDeliveryField;
