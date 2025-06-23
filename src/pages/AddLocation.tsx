import { Button, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../api";
import FetchingLoader from "../components/FetchingLoader";

const AddLocation = () => {
  const [state, setState] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState<{ type: "error" | "success"; content: string } | null>(
    null
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await api.put("locations/add", { location: state, amount });
    },
    onSuccess: () => {
      setMessage({ type: "success", content: "Location added!" });
      setState("");
    },
    onError: (err) => {
      let content = "Error adding location";
      if ("errors" in err) {
        const errors = err.errors as { msg: string }[];
        content = errors.map((error) => error.msg).join(", ");
      }

      setMessage({ type: "error", content });
    },
  });

  const onClick = () => {
    setMessage(null);

    if (!state.trim().length) {
      setMessage({ type: "error", content: "No location detected" });
      return;
    }

    mutate();
  };

  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Add Stores Location
      </Typography>

      <form>
        <TextField
          type="text"
          helperText="Enter New Location"
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={isPending}
        />
        <TextField
          type="number"
          helperText="Select the amount to add, set to 0 if not required"
          value={amount}
          onChange={(e) => {
            //Remove first character if it's a 0 and lentgh is > 1
            if (e.target.value[0] === "0" && e.target.value.length > 1)
              e.target.value = e.target.value.slice(1);
            setAmount(+e.target.value);
          }}
          disabled={isPending}
        />

        <Button variant="outlined" onClick={onClick} disabled={isPending}>
          Submit
        </Button>

        {isPending && <FetchingLoader message="adding location" />}
      </form>
      {message && (
        <Typography variant={"body2"} color={message.type === "success" ? "green" : "red"}>
          {message.content}
        </Typography>
      )}
    </>
  );
};

export default AddLocation;
