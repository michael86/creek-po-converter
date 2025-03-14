import { Button } from "@mui/material";
import { useRouter } from "@tanstack/react-router";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant="contained" onClick={() => router.history.go(-1)}>
      Back
    </Button>
  );
};

export default BackButton;
