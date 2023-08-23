import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, styled } from '@mui/material';

import { addTodo, deleteBox, editTodo } from '../../redux/action';
import ButtonComponent from '../../Components/ButtonComponent';
import CardComponent from '../../Components/CardComponent';
import CustomModal from '../../Components/CustomModal';
import InputComponent from '../../Components/InputComponent';
import AlertDialog from '../../Components/AlertDialog';

const HeadComponent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const ItemCard = styled('div')({
  flex: 1,
  marginRight: 0,
  marginLeft: 25,
});

const Item = styled('div')({
  backgroundColor: 'whitesmoke',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  padding: '20px',
  textAlign: 'center',
  color: '#1a2027',
  marginRight: '10px',
  flex: 1,
});

const StyledButton = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
  marginTop: '20px',
  marginRight: '10px',
});

const DashBoard = () => {
  const dispatch = useDispatch();
  const todoItems = useSelector((state) => state.todo.todo);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errorText, setErrorText] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);
  const [todo, setTodo] = useState({
    title: '',
    description: '',
  });

  const { title, description } = todo;

  const handleAddTodo = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setTodo({
      title: '',
      description: '',
    });
    setErrorText({});
  };

  const handleOnCancel = () => {
    handleCloseModal();
  };

  const handleChange = (evt) => {
    setTodo({ ...todo, [evt.target.name]: evt.target.value });
  };

  const validate = () => {
    let errors = {};
    let isError = false;

    if (!title.trim()) {
      errors.title = 'Please enter title.';
      isError = true;
    }
    if (!description.trim()) {
      errors.description = 'Please enter description.';
      isError = true;
    }

    setErrorText(errors);
    return {
      errors,
      isError,
    };
  };

  const onSubmitClick = () => {
    const validationResult = validate();

    if (!validationResult.isError) {
      const newTodo = {
        id: `${Date.now()}`,
        title,
        description,
      };
      handleCloseModal();
      dispatch(addTodo(newTodo));
    }
  };
  const handleDeleteTodo = (index) => {
    setSelectedDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleOnOpenModel = (index) => {
    const selectedItem = todoItems[index];
    setIsEdit(true);
    setTodo({
      id: selectedItem.id,
      title: selectedItem.title,
      description: selectedItem.description,
    });
    setOpenModal(true);
  };

  const handleOnEdit = () => {
    const validationResult = validate();

    if (!validationResult.isError) {
      const updateTodo = {
        id: todo.id,
        title,
        description,
      };

      handleCloseModal();
      dispatch(editTodo(updateTodo));
    }
  };

  const handleCloseAlert = () => {
    setOpenDialog(false);
  };
  const handleConfirmDelete = () => {
    if (selectedDeleteIndex !== null) {
      dispatch(deleteBox(selectedDeleteIndex));
      setSelectedDeleteIndex(null);
      setOpenDialog(false);
    }
  };

  return (
    <>
      <StyledButton>
        <ButtonComponent
          style={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          }}
          title="+ Create"
          onClick={handleAddTodo}
        />
      </StyledButton>
      <HeadComponent>
        <Item style={{ marginLeft: 10 }}>Todo</Item>
        <Item>In Progress</Item>
        <Item>QA</Item>
        <Item>Done</Item>
      </HeadComponent>
      {/* <Item style={{ backgroundColor: 'whitesmoke' }}> */}
      {todoItems.map((item, index) => (
        <ItemCard key={item?.id}>
          <CardComponent
            onDelete={() => handleDeleteTodo(index)}
            title={item?.title}
            description={item?.description}
            onClick={() => handleOnOpenModel(index)}
          />
        </ItemCard>
      ))}
      {/* </Item> */}

      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        title={isEdit ? 'Edit Todo' : 'Add Todo'}
      >
        <Box mb={{ xs: 6, md: 5 }}>
          <InputComponent
            fullWidth
            name="title"
            required
            variant="outlined"
            label="Title"
            value={title}
            onChange={handleChange}
            error={errorText?.title}
            helperText={errorText?.title}
          />
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <InputComponent
            fullWidth
            required
            name="description"
            variant="outlined"
            label="Description"
            type="textarea"
            rows={4}
            multiline
            value={description}
            onChange={handleChange}
            error={errorText?.description}
            helperText={errorText?.description}
          />
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          {isEdit ? (
            <ButtonComponent
              variant="contained"
              color="primary"
              title={'Update'}
              onClick={handleOnEdit}
            />
          ) : (
            <ButtonComponent
              variant="contained"
              color="primary"
              title={'Save'}
              onClick={onSubmitClick}
            />
          )}
          <ButtonComponent
            variant="contained"
            color="primary"
            title={'Cancel'}
            onClick={handleOnCancel}
            sx={{ marginLeft: 2 }}
          />
        </Box>
      </CustomModal>
      <AlertDialog
        open={openDialog}
        title="Delete Card"
        description="Are you sure you want to delete this card?"
        onClose={handleCloseAlert}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default DashBoard;
