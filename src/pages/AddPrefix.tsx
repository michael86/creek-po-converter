import { DebounceInput } from "react-debounce-input";
import axios from "../utils/interceptors";
import { useRef, useState } from "react";

const AddPrefix = () => {
  const [error, setError] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [value, setValue] = useState("");

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue("");

    if (!value.length) {
      setShowButton(false);
      return;
    }

    setError("");

    const res = await axios.get(`parts/prefix/is-valid/${value}`);

    if (typeof res.data.valid !== "boolean") {
      setError("Something went wrong, try again");
      return;
    }

    if (!res.data.valid) {
      setError("Prefix is already in use");
      setShowButton(false);

      return;
    }
    setValue(e.target.value);
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
    setError("Part added");
  };

  return (
    <>
      <h2>Add Prefix</h2>
      <DebounceInput debounceTimeout={800} onChange={onChange} />
      {showButton && <button onClick={onClick}>Save</button>}
      {error.length > 0 && <p>{error}</p>}
    </>
  );
};

export default AddPrefix;
