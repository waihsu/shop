import Navbar from "./Navbar";
// import { Box, Typography } from "@mui/material";
// import CircularProgress from "@mui/material/CircularProgress";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      {/* <Box
        sx={{
          disply: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 6,
          }}>
          Comming Soon <CircularProgress />
        </Typography>
      </Box> */}
    </div>
  );
};

export default Layout;
