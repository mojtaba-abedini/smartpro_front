import Checkbox from "@mui/material/Checkbox";

export default function StyledCheckbox({ title, titleColor, change }) {
  return (
    <div style={{ color: `${titleColor}` }} className="checkbox-title">
     
      <Checkbox onChange={(e) => change(e)} /> {title}
    </div>
  );
}
