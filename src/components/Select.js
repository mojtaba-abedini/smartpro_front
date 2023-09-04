import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from '@mui/material/Select';

export default function StyledSelect({label,array,change=()=> null,value}) {


  return (
    <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
      <InputLabel id="select">{label}</InputLabel>
      <Select labelId="select" id="select" value={value} onChange={(e) => change(e)}>
      {array.map((item,index) => <MenuItem key={index} value={item.id}>{item.title}</MenuItem>)}  
      </Select>
    </FormControl>
  );
}
