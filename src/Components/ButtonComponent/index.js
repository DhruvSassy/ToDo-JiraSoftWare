import { Button } from '@mui/material';
import React from 'react';

const ButtonComponent = (props) => {
  const { fullWidth, color, className, onClick, sx, title, style } = props;
  return (
    <Button
      fullWidth={fullWidth}
      color={color}
      variant="contained"
      className={className}
      onClick={onClick}
      sx={sx}
      style={style}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
