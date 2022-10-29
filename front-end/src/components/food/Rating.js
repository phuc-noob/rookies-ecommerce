import * as React from "react";
import Rating from "@mui/material/Rating";

export default function HoverRating(pros) {
  const [value, setValue] = React.useState(1);
  const [hover, setHover] = React.useState(-1);
  return (
    <Rating
      name="hover-feedback"
      value={pros.rate}
      precision={0.5}
      readOnly={true}
    />
  );
}
