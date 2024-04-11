import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: blue[600], // Light blue color
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" component="h3">
        {" "}
        TODO LIST APP
      </Typography>
    </Box>
  );
};

export default Header;
