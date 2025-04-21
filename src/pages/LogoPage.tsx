import { Box, Typography } from "@mui/material";

const LogoPage = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8F0",
      }}
    >
      <img width="50%" src="logo.png" alt="Logo" />
      <Typography
        sx={{
          fontFamily: '"Nunito Sans", sans-serif',
          fontSize: "3rem",
          fontWeight: "700",
        }}
      >
        GrocEase
      </Typography>
    </Box>
  );
};

export default LogoPage;
