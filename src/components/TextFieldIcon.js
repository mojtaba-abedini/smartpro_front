import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, InputLabel } from "@mui/material";

export default function StyledTextFieldIcon({
  label,
  widthSize = "100%",
  inputColor,
  textAlign,
  value,
  whiteText,
  slug,
  // change,
}) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="filled"  sx={{ width: "100%" }}>
        <InputLabel htmlFor="field">{label}</InputLabel>
        <FilledInput
          sx={{ width: `${widthSize}` }}
          // onChange={(e) => change(e)}
          inputProps={{
            min: 0,
            style: {
              textAlign: `${textAlign}`,
              paddingTop: "30px",
            },
          }}
          value={value}
          id="field"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => navigate(`/user/new-order/map/${slug}`)}
                edge="start"
              >
                {<SearchIcon />}
              </IconButton>
            </InputAdornment>
          }
          label=""
        />
      </FormControl>
    </Box>
  );
}
