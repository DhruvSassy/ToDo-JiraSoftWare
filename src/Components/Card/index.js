import React from 'react';
import { Card, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Draggable } from 'react-beautiful-dnd';

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
});

const CardComponent = (props) => {
  const { onDelete, onEdit, title, description,draggableId,key,index } = props;
  return (
    <>

    <Draggable draggableId={draggableId} key={key}
    index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            padding: '8px',
            marginLeft: '8px',
            borderRadius: '4px',
            width: '91%',
            ...provided.draggableProps.style,
          }}
        >
          <CardBox
            onDelete={onDelete}
            onClick={onEdit}
            style={{
              borderRadius: '7%',
              cursor: 'pointer',
              backgroundColor: 'whitesmoke',
              color: 'black',
            }}
          >
            <Item>{`Title: ${title}`}</Item>
            <Item>{`Description: ${description}`}</Item>
            <IconComponent>
              <DeleteIcon onClick={onDelete} style={{ cursor: 'auto' }} />
            </IconComponent>
          </CardBox>
        </div>
      )}
    </Draggable>
    </>
  );
};

export default CardComponent;
