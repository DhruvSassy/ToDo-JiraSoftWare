import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonComponent from '../../../Components/ButtonComponent';
import CardComponent from '../../../Components/CardComponent';
import { addBox, deleteBox } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DashBoard = () => {
  const dispatch = useDispatch();
  const todoItems = useSelector((state) => state.todo.todo);
  console.log('todoItems', todoItems);
  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: 'New Todo Item',
    };

    dispatch(addBox(newTodo));
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteBox(index)); // Dispatch the deleteBox action with the index
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px',
          marginTop: '20px',
          marginRight: '10px',
        }}
      >
        <ButtonComponent title="Add Todo" onClick={handleAddTodo} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
          <Item style={{ backgroundColor: 'whitesmoke' }}>Todo</Item>
        </div>
        <div style={{ flex: 1, marginRight: 10 }}>
          <Item style={{ backgroundColor: 'whitesmoke' }}>In Progress</Item>
        </div>
        <div style={{ flex: 1, marginRight: 10 }}>
          <Item style={{ backgroundColor: 'whitesmoke' }}>QA</Item>
        </div>
        <div style={{ flex: 1, marginRight: 10 }}>
          <Item style={{ backgroundColor: 'whitesmoke' }}>Done</Item>
        </div>
      </div>

      <Item style={{ backgroundColor: 'whitesmoke' }}>
        {todoItems.length === 0 ? (
          <p>No Tickets</p>
        ) : (
          todoItems.map((item, index) => (
            <CardComponent
              key={item.id}
              onClick={() => handleDeleteTodo(index)}
              index={index}
            />
          ))
        )}
      </Item>
    </>
  );
};

export default DashBoard;
