import { Typography } from "@mui/material";
import CreateEntityForm from "../components/createEntityForm";

const AddLocation = () => {
  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Add Stores Location
      </Typography>

      <CreateEntityForm route="location" />
    </>
  );
};

export default AddLocation;
