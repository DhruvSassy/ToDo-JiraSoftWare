import React from 'react';

import { Box,Card,styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  marginTop: '15px',
  marginBottom: '20px',
  marginLeft: '10px',
  fontWeight: 'bold',
  fontSize: '1rem',
  letterSpacing: '1px',
});

const IconComponent = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
  marginTop: '20px',
  marginRight: '10px',
});

const CardBox = styled(Card)({
  maxWidth: '345px',
  marginTop: '20px',
});

const CardComponent = ({ onDelete, title, description, onClick }) => {
  return (
    <CardBox onClick={onClick}>
      <Box>
        <Item>{`Title : ${title}`}</Item>
        <Item>{`Description : ${description}`}</Item>
        <IconComponent>
          <DeleteIcon onClick={onDelete} />
        </IconComponent>
      </Box>
    </CardBox>
  );
};

export default CardComponent;
