import Button from "@mui/material/Button";

export default function StyledButton(props) {
  return (
    <Button
      color="primary"
      style={{ padding: "20px 40px" }}
      sx={{ fontSize: 13 }}
      variant="contained"
      size="medium"
    >
      {props.title}
    </Button>
  );
}
