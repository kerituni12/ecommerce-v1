import { TextField, MenuItem, Grid } from "@material-ui/core";
import { Controller } from "react-hook-form";
const currencies = [
  {
    value: "giay-nam",
    label: "Giày nam",
  },
  {
    value: "giay-nu",
    label: "Giày nữ",
  },
];
function BasicInfoProduct({ control, errors }) {
  return (
    <>
      <Controller
        as={<TextField margin="normal" variant="outlined" fullWidth required />}
        label="Title"
        name="title"
        control={control}
        helperText={errors.title ? errors.title.message : null}
        error={errors.title ? true : false}
        defaultValue=""
        rules={{
          required: "this is required",
          pattern: { value: /^[a-zA-Z 0-9]*$/, message: "not include special characters" },
        }}
      />
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Controller
            as={<TextField type="number" margin="normal" variant="outlined" fullWidth required />}
            label="Price"
            name="price"
            control={control}
            rules={{ required: "this is required" }}
            helperText={errors.price ? errors.price.message : null}
            error={errors.price ? true : false}
            defaultValue=""
          />
        </Grid>
        <Grid item sm={6}>
          <Controller
            as={<TextField type="number" margin="normal" variant="outlined" fullWidth required />}
            label="Inventory"
            name="inventory"
            control={control}
            rules={{ required: "this is required" }}
            helperText={errors.price ? errors.price.message : null}
            error={errors.price ? true : false}
            defaultValue=""
          />
        </Grid>
      </Grid>

      <Controller
        as={
          <TextField select margin="normal" variant="outlined" fullWidth required>
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        }
        label="Category"
        name="category"
        rules={{ required: "this is required" }}
        control={control}
        defaultValue=""
        helperText={errors.category ? errors.category.message : null}
        error={errors.category ? true : false}
      />
      <Controller
        as={<TextField margin="normal" variant="outlined" fullWidth />}
        label="Image"
        name="image"
        control={control}
        defaultValue=""
      />
    </>
  );
}

export default BasicInfoProduct;
