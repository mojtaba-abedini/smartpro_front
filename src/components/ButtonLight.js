import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function StyledButtonLight(props) {
  const StyledButton = styled(Button)(() => ({
    borderRadius: 5,
    padding: "20px 40px",
    background: "#f6f6f6",
    color: "#1d4ed8",
    "&:hover": {
      backgroundColor: "#eee",
    },
  }));

  return (
    <StyledButton sx={{ fontSize: 13 }} variant="contained" size="medium">
      {props.isLoading ?  <Box style={{width:'90px',height:'22px'}}><CircularProgress style={{ width: "25px", height: "25px", color: "primary" }}/></Box> : props.title}
    </StyledButton>
  );
}
