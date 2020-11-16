import { TextField, MenuItem, InputLabel, OutlinedInput, FormControl, InputAdornment } from "@material-ui/core";
import { Controller } from "react-hook-form";
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
function SeoProduct({ control, errors }) {
  return (
    <>
      <Controller
        as={<TextField margin="normal" variant="outlined" fullWidth />}
        label="Slug"
        name="slug"
        control={control}
        defaultValue=""
      />
      <Controller
        as={<TextField margin="normal" variant="outlined" fullWidth multiline />}
        label="Description"
        name="description"
        control={control}
        defaultValue=""
      />
    </>
  );
}

export default SeoProduct;
