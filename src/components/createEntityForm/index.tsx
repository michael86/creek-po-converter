import { InputLabel, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

import FetchingLoader from "../FetchingLoader";
import { putEntity } from "../../api/queries/putEntity";

type Props = {
  route: "location" | "prefix";
};

const CreateEntityForm: React.FC<Props> = ({ route }) => {
  const [state, setState] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    content: string;
  } | null>(null);

  const { mutate, isPending } = putEntity();

  const routeLabel = route.charAt(0).toUpperCase() + route.slice(1);
  const inputId = `${route}-name`;

  const onClick = () => {
    setMessage(null);

    if (!state.trim().length) {
      setMessage({
        type: "error",
        content: `No ${routeLabel} detected`,
      });
      return;
    }

    if (route === "location" && amount < 0) {
      setMessage({
        type: "error",
        content: "Amount cannot be negative",
      });
      return;
    }

    mutate(
      route === "location"
        ? { route: "location", state, amount }
        : { route: "prefix", prefix: state },
      {
        onSuccess: () => {
          setMessage({
            type: "success",
            content: `${routeLabel} added`,
          });
          setState("");
          setAmount(0);
        },
        onError: (err: any) => {
          let content = `Error adding ${routeLabel}`;
          if ("errors" in err) {
            const errors = err.errors as { msg: string }[];
            content = errors.map((error) => error.msg).join(", ");
          }
          setMessage({ type: "error", content });
        },
      }
    );
  };

  return (
    <>
      <form
        style={{
          width: "30%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <InputLabel htmlFor={inputId}>
          {route === "location" ? "Add New Location" : "Add New Prefix"}
        </InputLabel>

        <TextField
          id={inputId}
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={isPending}
        />

        {route === "location" && (
          <>
            <InputLabel sx={{ marginTop: 2 }} htmlFor="location-amount">
              Amount
            </InputLabel>
            <TextField
              id="location-amount"
              type="number"
              helperText="Select the amount to add, set to 0 if not required"
              value={amount}
              onChange={(e) => {
                if (e.target.value[0] === "0" && e.target.value.length > 1) {
                  e.target.value = e.target.value.slice(1);
                }
                setAmount(+e.target.value);
              }}
              disabled={isPending}
            />
          </>
        )}

        <Button
          variant="outlined"
          onClick={onClick}
          disabled={isPending}
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>

        {isPending && (
          <FetchingLoader message={`Adding ${routeLabel.toLowerCase()}`} />
        )}
      </form>

      {message && (
        <Typography
          variant={"body2"}
          color={message.type === "success" ? "green" : "red"}
          align="center"
          marginTop={3}
          fontSize={25}
        >
          {message.content}
        </Typography>
      )}
    </>
  );
};

export default CreateEntityForm;
