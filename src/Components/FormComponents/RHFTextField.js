import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";

RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helpertext: PropTypes.node
}
export default function RHFTextField({ name, helpertext, ...other }) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              fullWidth
              rows={5}
              error={!!error}
              helpertext={error ? error.message : helpertext}
              {...other}
            />
            {error?.message && <span style={{ color: "red" }}>{error.message}</span>}
          </>

        )}
      />
    </>
  );
}
