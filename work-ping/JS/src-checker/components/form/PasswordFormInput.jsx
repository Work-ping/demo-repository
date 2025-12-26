import { useState } from "react";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";
import { Controller } from "react-hook-form";

const PasswordFormInput = ({
  name,
  label,
  control,
  id,
  containerClassName = "mb-3",
  noValidate,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // 🛑 Guard: controller MUST receive control
  if (!control || !name) return null;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => (
        <FormGroup className={containerClassName}>
          {label && <FormLabel htmlFor={id || name}>{label}</FormLabel>}

          <div className="position-relative">
            <FormControl
              {...field}
              {...rest}
              id={id || name}
              type={showPassword ? "text" : "password"}
              isInvalid={!!fieldState?.error}
            />

            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
            </span>

            {!noValidate && fieldState?.error && (
              <Feedback type="invalid">
                {fieldState.error.message}
              </Feedback>
            )}
          </div>
        </FormGroup>
      )}
    />
  );
};

export default PasswordFormInput;
