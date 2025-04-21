import { Box, IconButton, Typography, TextField, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TabContext } from "../context/TabContext";
import { Icon } from "@iconify/react";
import { DbContext } from "../context/DbContext";

const ProfilePage = () => {
  const { setHeading, setCurrentTab, tabClicked, setTabClicked } =
    useContext(TabContext);

  const { user, setUser } = useContext(DbContext);

  useEffect(() => {
    const ListPageHeading = () => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <IconButton
            sx={{
              ":focus": { outline: "none" },
              padding: 0,
            }}
            disableRipple
            onClick={() => {
              setCurrentTab("Home");
              setTabClicked(!tabClicked);
            }}
          >
            <Icon
              icon="material-symbols:keyboard-arrow-left"
              width="2rem"
              height="2rem"
            ></Icon>
          </IconButton>
          <Typography sx={{ fontWeight: "700", fontSize: "1.66666666667rem" }}>
            Profile
          </Typography>
        </Box>
      );
    };

    setHeading(<ListPageHeading />);
  }, [setHeading, setCurrentTab, tabClicked, setTabClicked]);

  const [name, setName] = useState(user.firstName);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1em",
      }}
    >
      <Box
        component="img"
        src={user.thumbnail}
        alt="User"
        sx={{ width: "5rem", marginTop: "5rem", alignSelf: "center" }}
      ></Box>
      <Typography
        sx={{ fontWeight: "700", fontSize: "1.5rem", alignSelf: "center" }}
      >
        Hello, {user.firstName}!
      </Typography>
      <Typography sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
        Name
      </Typography>
      <TextField
        variant="outlined"
        sx={{
          width: "100%",
          height: "3rem",
          borderRadius: "1rem",
          "& .MuiOutlinedInput-root": {
            width: "100%",
            height: "3rem",
            backgroundColor: "white",
          },
        }}
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Typography sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
        Email Address
      </Typography>
      <TextField
        variant="outlined"
        sx={{
          width: "100%",
          height: "3rem",
          borderRadius: "1rem",
          "& .MuiOutlinedInput-root": {
            width: "100%",
            height: "3rem",
            backgroundColor: "white",
          },
        }}
        placeholder="Name"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Typography sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
        Phone No
      </Typography>
      <TextField
        variant="outlined"
        sx={{
          width: "100%",
          height: "3rem",
          borderRadius: "1rem",
          "& .MuiOutlinedInput-root": {
            width: "100%",
            height: "3rem",
            backgroundColor: "white",
          },
        }}
        placeholder="Name"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      <Typography sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
        Password
      </Typography>
      <TextField
        variant="outlined"
        sx={{
          width: "100%",
          height: "3rem",
          borderRadius: "1rem",
          "& .MuiOutlinedInput-root": {
            width: "100%",
            height: "3rem",
            backgroundColor: "white",
          },
        }}
        placeholder="Name"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        variant="contained"
        sx={{
          ":hover": { boxShadow: "none" },
          width: "100%",
          height: "4rem",
          borderRadius: "1rem",
          backgroundColor: "#1F211E",
          fontWeight: "700",
          fontSize: "1.33333333333rem",
          padding: 0,
          lineHeight: "4rem",
          textAlign: "center",
          boxShadow: "none",
          textTransform: "none",
          marginTop: "1rem",
        }}
        disableRipple
        onClick={() => {
          setUser({ ...user, firstName: name });
        }}
      >
        Save
      </Button>
    </Box>
  );
};

export default ProfilePage;
