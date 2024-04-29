import axios from "../utils/interceptors";
import { useState } from "react";
import ReactLoading from "react-loading";
import Input, { InputProps } from "@mui/joy/Input";
import { useRef } from "react";
import { Button, Typography } from "@mui/material";

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout: number;
};

function DebounceInput(props: InputProps & DebounceProps) {
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...rest} onChange={handleChange} />;
}

const AddPrefix = () => {
  const [message, setMessage] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const [debouncedValue, setDebouncedValue] = useState("");
  const handleDebounce = async (value: string) => {
    setValue("");

    if (!value.length) {
      setShowButton(false);
      return;
    }

    setMessage("");
    setLoading(true);
    const res = await axios.get(`parts/prefix/is-valid/${value}`);
    setLoading(false);
    if (typeof res.data.valid !== "boolean") {
      setMessage("Something went wrong, try again");
      return;
    }

    if (!res.data.valid) {
      setMessage("Prefix is already in use");
      setShowButton(false);

      return;
    }
    setValue(value);
    setShowButton(true);
  };

  const onClick = async () => {
    if (!value.length) return;

    const res = await axios.put(`/parts/prefix/add`, {
      prefix: value,
    });

    if (!res.data.inserted) return;

    setShowButton(false);
    setValue("");
    setMessage("Part added");
    setDebouncedValue("Part added");
  };

  return (
    <div className="flex flex-center">
      <h2>Add Prefix</h2>
      <DebounceInput
        placeholder="Validate prefix"
        debounceTimeout={1000}
        handleDebounce={handleDebounce}
      />
      <Typography> {message}</Typography>
      {loading && (
        <div className="flex flex-center">
          <ReactLoading type="balls" color="#blue" />
          <p>Validating prefix</p>
        </div>
      )}
      {showButton && (
        <Button variant="contained" onClick={onClick} style={{ marginTop: "1rem" }}>
          save
        </Button>
      )}
    </div>
  );
};

export default AddPrefix;
