import { DebounceInput } from "react-debounce-input";
import axios from "../utils/interceptors";

const AddPrefix = () => {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value.length) return;

    const isValid = await axios.get(`parts/prefix/is-valid/${value}`);
  };

  return (
    <>
      <h2>Add Prefix</h2>
      <DebounceInput debounceTimeout={800} onChange={onChange} />
    </>
  );
};

export default AddPrefix;
