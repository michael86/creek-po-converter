import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../store";
import { useRouter } from "@tanstack/react-router";
import { getGroupedButtonsForRole } from "../schemas/dashboardButtons";

const Dashboard = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const roleButtons = getGroupedButtonsForRole(auth.role!);

  return (
    <>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="body1">Welcome {auth.user}</Typography>

        {!roleButtons.length ? (
          <Typography variant="body1" color="red">
            No role assigned, speak to an admin
          </Typography>
        ) : (
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            flexDirection={"column"}
            marginTop={2}
          >
            {roleButtons.map((buttonGroup) => (
              <Box
                key={buttonGroup.title}
                mb={2}
                textAlign="center"
                border={1}
                p={2}
                borderRadius={2}
                boxShadow={3}
              >
                <Typography
                  variant="h6"
                  mb={1}
                  sx={{ marginBottom: 3, textDecoration: "underline" }}
                >
                  {buttonGroup.title}
                </Typography>

                {buttonGroup.buttons.map((btn, i) => (
                  <Button
                    key={btn.route}
                    variant="contained"
                    color="primary"
                    onClick={() => router.navigate({ to: btn.route })}
                    sx={{ mb: 1, mr: i !== buttonGroup.buttons.length - 1 ? 1 : 0, boxShadow: 5 }}
                  >
                    {btn.label}
                  </Button>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
