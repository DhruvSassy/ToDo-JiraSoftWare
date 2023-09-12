import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, styled } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import {
  addTask,
  editTask,
  deleteTask,
  changeTaskStatus,
} from '../../redux/action';


// import Button from '../../Components/Button';
import { Button,Card,CustomModal, Input,AlertDialog,NotificationStack} from '../../Components';
// import Card from '../../Components/Card';
// import CustomModal from '../../Components/CustomModal';
// import Input from '../../Components/Input';
// import AlertDialog from '../../Components/AlertDialog';
// import NotificationStack from '../../Components/NotificationStack';

const HeaderCard = styled(Box)({
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
  console.log('task', tasks);
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [errorText, setErrorText] = useState({});
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [searchTicket, setSearchTicket] = useState('');
  const [todo, setTodo] = useState({
    id: '',
    title: '',
    description: '',
  });

  const { id, title, description } = todo;

  const notiComponent = NotificationStack();

  const handleAddTodo = () => {
    setOpenCustomModal(true);
  };

  const handleCloseModal = () => {
    setOpenCustomModal(false);
    setTodo({
      id: '',
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
        id:`${Date.now()}`,
        title,
        description,
        status: 'ToDo',
      };
      handleCloseModal();

      dispatch(addTask(newTodo));
      notiComponent.showSnackbar('ToDo added successfully!', 'success');
    }
  };

  const handleOnOpenModel = (id) => {
    const selectedItem = tasks.find((task) => task.id === id);
    setTodo({
      id : id,
      title: selectedItem?.title,
      description: selectedItem?.description,
    });
    setOpenCustomModal(true);
  };

  const handleOnEdit = () => {
    const validationResult = validate();
    if (!validationResult.isError) {
      const updatedTodo = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
      };
      dispatch(editTask(updatedTodo));
      handleCloseModal();
      notiComponent.showSnackbar('Todo Updated successfully!', 'success');
    }
  };

  const handleDeleteTodo = (id) => {
    setOpenCustomModal(false);
    setTodo({
      id,
    });
    setOpenAlertBox(true);
  };

  const handleConfirmDelete = () => {
    if (id !== null) {
      dispatch(deleteTask(id));
      setOpenAlertBox(false);
      setOpenCustomModal(false);
      notiComponent.showSnackbar('ToDo Deleted successfully!', 'success');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTicket(event.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTicket.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTicket.toLowerCase())
  );


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
    }
  };

  const handleCloseAlert = () => {
    setOpenCustomModal(false);
    setOpenAlertBox(false);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Jira Board</h1>
      <HeaderCard>
        <Input title="search" type="search"  value={searchTicket}
          onChange={handleSearchChange} placeholder="Search" sx={{marginRight:"100px"}} />
        <Button title="+ Create" onClick={handleAddTodo} />
      </HeaderCard>
      <div
        style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {Status.map((status) => (
            <Droppable key={status.id} droppableId={status?.title}>
              {(provided, snapshot) => {
                const taskList = status.title === 'Search Results' ? filteredTasks : tasks;
                const task = taskList.filter((rec) => rec.status === status.title);
                return (
                  <div
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? 'lightgrey'
                        : 'white',
                      width: '25%',
                      minHeight: '500px',
                      marginRight: '10px',
                      marginLeft: '10px',
                    }}
                    {...provided.droppableProps}
                  >
                    <h2 style={{ textAlign: 'center' }}>{status.title}</h2>
                    <hr
                      style={{
                        color: 'black',
                        height: '1px',
                        backgroundColor: 'black',
                      }}
                    />
                    {task.map((item, index) => (
                      <Card
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        onDelete={() => handleDeleteTodo(item.id)}
                        onEdit={() => handleOnOpenModel(item.id)}
                        title={item.title}
                        description={item.description}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      {openAlertBox ? (
        <AlertDialog
          open={openAlertBox}
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          onClose={handleCloseAlert}
          onConfirm={handleConfirmDelete}
        />
      ) : (
        <CustomModal
          open={openCustomModal}
          onClose={handleCloseModal}
          title={id ? 'Edit Task' : 'Add Task'}
        >
          <Box mb={{ xs: 6, md: 5 }}>
            <Input
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
            <Input
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
          <Box display="flex" justifyContent="flex-end" mb={{ xs: 6, md: 5 }}>
            <Button
              variant="contained"
              color="primary"
              title={'Cancel'}
              style={{ backgroundColor: 'whitesmoke', color: 'black' }}
              onClick={handleOnCancel}
            />
            {id ? (
              <Button
                variant="contained"
                color="primary"
                title={'Update'}
                onClick={handleOnEdit}
                sx={{ marginLeft: 2 }}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                title={'Save'}
                onClick={onSubmitClick}
                sx={{ marginLeft: 2 }}
              />
            )}
          </Box>
        </CustomModal>
      )}
    </>
  );
};

export default DashBoard;
