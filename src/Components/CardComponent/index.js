import React from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InputComponent from '../InputComponent';

const CardComponent = (props) => {
  const { onClick, index } = props;

  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <Box color="text.primary" sx={{ margin: 1 }}>
        <InputComponent label={`Title ${index}`} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px',
            marginTop: '20px',
            marginRight: '10px',
          }}
        >
          <DeleteIcon onClick={onClick} />
        </div>
      </Box>
    </Card>
  );
};

export default CardComponent;
