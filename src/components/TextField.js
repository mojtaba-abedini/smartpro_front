import { Box } from "@mui/material";

import TextField from "@mui/material/TextField";

export default function StyledTextField({
  label,
  widthSize='100%',
  // inputColor,
  textAlign,
  value,
  maxLength,

  // whiteText,
  change = () => null,
}) {
  // const StyledTextField = styled(TextField)({
  //   // width: `${widthSize}`,

  //   input: {
  //     color: `${inputColor}`,
  //   },

  //   "& label.Mui-focused": {
  //     color: "white",
  //   },
  //   "& label": {
  //     color: "white",
  //   },
  //   "& .MuiInput-underline:after": {
  //     borderBottomColor: "white",
  //   },
  // });

  return (
    <Box sx={{ width: "100%" }}>
      {/* <p
        style={{ textAlign: `${textAlign}` }}
        className={`${whiteText ? "white-color" : ""}`}
      >
        {label}
      </p> */}
      <TextField

        sx={{ width: `${widthSize}` }}
        value={value}
        onChange={(e) => change(e)}
        inputProps={{
          maxLength: maxLength,
          min: 0,
          style: {
            textAlign: `${textAlign}`,
          
            paddingTop: "30px",
          },
        }}
        className="textfield"
        id="filled-basic"
        label= {label}
        variant="filled"
      />
    </Box>
  );
}
