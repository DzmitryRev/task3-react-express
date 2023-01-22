/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

function TextFieldCustom({ ...atrs }: TextFieldProps) {
  return <TextField sx={{ mb: 2 }} fullWidth id="outlined-error" autoComplete="off" {...atrs} />;
}

export default TextFieldCustom;
