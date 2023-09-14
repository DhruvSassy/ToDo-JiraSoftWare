import React from 'react';

import { Button } from '@mui/material';

const ButtonComponent = (props) => {
  const { fullWidth, color, className, onClick, sx, title, style,endIcon } = props;
  return (
    <Button
      fullWidth={fullWidth}
      color={color}
      variant="contained"
      className={className}
      onClick={onClick}
      sx={sx}
      style={style}
      endIcon={endIcon}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
