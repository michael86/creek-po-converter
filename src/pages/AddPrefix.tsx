import { Typography } from "@mui/material";
import CreateEntityForm from "../components/createEntityForm";

const AddPrefix = () => {
  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Add Stores Prefix
      </Typography>

      <CreateEntityForm route="prefix" />
    </>
  );
};

export default AddPrefix;
