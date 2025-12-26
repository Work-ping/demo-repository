import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { Controller } from 'react-hook-form';

const TextFormInput = ({
  name,
  label,
  control,
  id,
  containerClassName = 'mb-3',
  noValidate,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClassName}>
          {label && <FormLabel htmlFor={id || name}>{label}</FormLabel>}

          <FormControl
            id={id || name}
            {...field}
            {...rest}
            isInvalid={!!fieldState.error}
          />

          {!noValidate && fieldState.error && (
            <Feedback type="invalid">
              {fieldState.error.message}
            </Feedback>
          )}
        </FormGroup>
      )}
    />
  );
};

export default TextFormInput;
