import React from 'react';

import { TextField } from '@mui/material';

const InputComponent = (props) => {
  const {
    sx,
    fullWidth,
    name,
    label,
    value,
    type,
    onChange,
    error,
    helperText,
    placeholder,
    className,
    disabled,
    defaultValue,
    autoFocus
  } = props;
  return (
    <TextField
      sx={sx}
      fullWidth={fullWidth}
      name={name}
      label={label}
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      margin="normal"
      required
      autoFocus={autoFocus}
      error={error}
      helperText={helperText}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  );
};

export default InputComponent;
