import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ThresholdWarning from "./ThresoldWarning";
import { setDeliveryThreshold } from "../../api/queries/setDeliveryThreshold";
import { useMutation } from "@tanstack/react-query";

type Props = {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  quantitiyToReceive: number;
  parcels: number[];
  setParcels: React.Dispatch<React.SetStateAction<number[]>>;
  thresholdChecked: boolean;
  setThresholdChecked: React.Dispatch<React.SetStateAction<boolean>>;
  uuid: string;
};

const AddDeliveryField: React.FC<Props> = ({
  parcels,
  setParcels,
  setError,
  quantitiyToReceive,
  thresholdChecked,
  setThresholdChecked,
  uuid,
}) => {
  const [parcelTotal, setParcelTotal] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const parcelRef = useRef<HTMLInputElement | null>(null);

  const putDeliveryState = useMutation({
    mutationFn: ({ uuid, state }: { uuid: string; state: boolean }) =>
      setDeliveryThreshold(uuid, state),
  });

  const addParcel = () => {
    setError(null);
    const quantity = parseInt(parcelRef.current?.value || "0");
    if (!quantity || quantity <= 0) {
      setError("Enter a valid quantity");
      return;
    }

    const parcelsReceived = parcels.reduce((a, b) => a + b, 0) + quantity;

    if (!thresholdChecked && quantitiyToReceive - parcelsReceived < 0) {
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

  const handleThresholdChange = async () => {
    try {
      setMessage(null);
      await putDeliveryState.mutateAsync({ uuid, state: !thresholdChecked });

      setThresholdChecked(!thresholdChecked);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const validationMessages = error.response.data.errors.map((e: any) => e.msg).join(", ");
        setMessage(validationMessages);
        console.error("Validation failed:", validationMessages);
      } else {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occured, contact support");
      }
    }
  };

  return (
    <>
      <FormControlLabel
        disabled={thresholdChecked && quantitiyToReceive - parcels.reduce((a, b) => a + b, 0) < 0}
        control={<Checkbox checked={thresholdChecked} onChange={handleThresholdChange} />}
        label={
          <>
            threshold{" "}
            {(thresholdChecked || message) && (
              <ThresholdWarning
                message={message ? message : undefined}
                sx={message ? { color: "red" } : undefined}
              />
            )}
          </>
        }
      />
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
    </>
  );
};

export default AddDeliveryField;
