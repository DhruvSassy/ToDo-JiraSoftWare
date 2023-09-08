import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  changeTaskStatus,
  deleteTask,
  editTodo,
} from '../../redux/action';

import { Box, styled } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import ButtonComponent from '../../Components/ButtonComponent';
import CardComponent from '../../Components/CardComponent';
import CustomModal from '../../Components/CustomModal';
import InputComponent from '../../Components/InputComponent';
import AlertDialog from '../../Components/AlertDialog';
import NotiStackComponent from '../../Components/NotiStackComponent';

const StyledButton = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
  marginTop: '20px',
  marginRight: '10px',
});

const Status = [
  { id: 1, title: 'ToDo' },
  { id: 2, title: 'InProgress' },
  { id: 3, title: 'QA' },
  { id: 4, title: 'Done' },
];

const DashBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todoJira.tasks);
  console.log("task",tasks)
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errorText, setErrorText] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState(null);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);
  const [todo, setTodo] = useState({
    title: '',
    description: '',
  });

  const [tasksByStatus, setTasksByStatus] = useState(tasks);

  const { title, description } = todo;

  const notiComponent = NotiStackComponent();

  const handleAddTodo = () => {
    setOpenModal(true);
    setIsEdit(false);
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
      errors.title = 'Please enter a title.';
      isError = true;
    }
    if (!description.trim()) {
      errors.description = 'Please enter a description.';
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
        status: 'ToDo', 
      };
      handleCloseModal();
      dispatch(addTodo(newTodo));
      notiComponent.showSnackbar('ToDo added successfully!', 'success');
    }
  };

  const handleDeleteTodo = (id) => {
    setSelectedDeleteIndex(id);
    setOpenDialog(true);
  };

  const handleOnOpenModel = (id) => {
    const selectedItem = tasks.find((task) => task.id === id); 
    setTodo({
      title: selectedItem?.title,
      description: selectedItem?.description,
    });
    setTaskIdToEdit(id);
    setOpenModal(true);
    setIsEdit(true);
  };
  


  const handleOnEdit = () => {
    const validationResult = validate();
  
    if (!validationResult.isError) {
      const updatedTodo = {
        id: taskIdToEdit, 
        title: todo.title,
        description: todo.description,
      };
      dispatch(editTodo(updatedTodo)); 
      handleCloseModal();
      notiComponent.showSnackbar('Todo Updated successfully!', 'success');
    }
  };

  const handleCloseAlert = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteIndex !== null) {
      dispatch(deleteTask(selectedDeleteIndex));
      setSelectedDeleteIndex(null);
      setOpenDialog(false);
    }
    notiComponent.showSnackbar('ToDo Deleted successfully!', 'success');
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const draggedTaskId = result.draggableId;

    const draggedTask = tasks.find((task) => task.id === draggedTaskId);

    if (!draggedTask) {
      return;
    }

    const destinationStatus = destination.droppableId;
    if (
      (source.droppableId === 'ToDo' &&
        destination.droppableId === 'InProgress') ||
      (source.droppableId === 'InProgress' &&
        destination.droppableId === 'ToDo') ||
      (source.droppableId === 'InProgress' &&
        destination.droppableId === 'QA') ||
      (source.droppableId === 'QA' &&
        destination.droppableId === 'InProgress') ||
      (source.droppableId === 'QA' && destination.droppableId === 'Done')
    ) {
      dispatch(changeTaskStatus(draggedTaskId, destinationStatus)); 

      const updatedTasks = tasks.map((task) => {
        if (task.id === draggedTaskId) {
          return { ...task, status: destinationStatus };
        }
        return task;
      });

      setTasksByStatus(updatedTasks);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Jira Board</h1>
      <StyledButton>
        <ButtonComponent
          style={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          }}
          title="+ Create"
          onClick={handleAddTodo}
        />
      </StyledButton>
      <div
        style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {Status.map((status) => (
            <Droppable key={status.id} droppableId={status?.title}>
              {(provided, snapshot) => {
                const task = tasksByStatus.filter(
                  (rec) => rec.status === status.title
                );
                return (
                  <div
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? 'lightblue'
                        : 'lightgrey',
                      width: '25%',
                      marginRight: '10px',
                      marginLeft: '10px',
                    }}
                    {...provided.droppableProps}
                  >
                    <h2 style={{ textAlign: 'center' }}>{status.title}</h2>
                    <hr />
                    {task.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
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
                            <CardComponent
                              onDelete={() => handleDeleteTodo(item.id)}
                              title={item.title}
                              description={item.description}
                              onClick={() => handleOnOpenModel(item?.id)}
                              style={{ borderRadius: '7%', cursor: 'pointer', backgroundColor: snapshot.isDragging
                              ? "#263B4A"
                              : "#456C86", color:'white'}}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
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
            value={todo?.title}
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
            value={todo?.description}
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
