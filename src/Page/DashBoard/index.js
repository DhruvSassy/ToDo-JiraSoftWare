import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import {
  addTodo,
  changeTaskStatus,
  deleteTask,
  editTodo,
} from '../../redux/action';
import CardComponent from '../../Components/CardComponent';
import CustomModal from '../../Components/CustomModal';
import InputComponent from '../../Components/InputComponent';
import AlertDialog from '../../Components/AlertDialog';
import NotiStackComponent from '../../Components/NotiStackComponent';
import Editor from '../../Components/CkEditor';
import CkEditor from '../../Components/CkEditor';

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
  console.log("tasks:",tasks)

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errorText, setErrorText] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEditIndex, setSelectedEditIndex] = useState(null);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);
  const [todo, setTodo] = useState({
    title: '',
    description: '',
  });

  const initialTasksByStatus = {
    ToDo: tasks,
    InProgress: [],
    QA: [],
    Done: [],
  };

  const [tasksByStatus, setTasksByStatus] = useState(initialTasksByStatus);

  const { title, description } = todo;

  const notiComponent = NotiStackComponent();

  const handleAddTodo = () => {
    setSelectedEditIndex(null);
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
      // Find the status object based on the selected title
      const selectedStatus = Status.find((status) => status.title === 'ToDo');

      if (selectedStatus) {
        const newTodo = {
          id: `${Date.now()}`,
          title,
          description,
        };
        handleCloseModal();
        dispatch(addTodo(newTodo));
        notiComponent.showSnackbar('ToDo added successfully!', 'success');
      }
    }
  };

  const handleDeleteTodo = (id) => {
    setSelectedDeleteIndex(id);
    setOpenDialog(true);
  };

  const handleOnOpenModel = (index) => {
    const selectedItem = tasks[index];
    setTodo({
      title: selectedItem?.title,
      description: selectedItem?.description,
    });
    setSelectedEditIndex(index);
    setOpenModal(true);
    setIsEdit(true);
  };
  
  const handleOnEdit = () => {
    const validationResult = validate();

    if (!validationResult.isError && selectedEditIndex !== null) {
      const updatedTodo = {
        id: tasks[selectedEditIndex].id,
        title,
        description,
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
   

    const newTasksByStatus = { ...tasksByStatus };
    
    // Find the source and destination arrays based on droppableIds
    const sourceArray = [...newTasksByStatus[source.droppableId]];
    const destinationArray = [...newTasksByStatus[destination.droppableId]];
             
      // Remove the task from the source array
      const [draggedTask] = sourceArray.splice(source.index, 1);

      // Add the task to the destination array
      destinationArray.splice(destination.index, 0, draggedTask);

      // Update the tasksByStatus object with the new arrays
      newTasksByStatus[source.droppableId] = sourceArray;
      newTasksByStatus[destination.droppableId] = destinationArray;

    if (
      (source.droppableId === 'ToDo' &&
        destination.droppableId === 'InProgress') ||
      (source.droppableId === 'InProgress' &&
        destination.droppableId === 'ToDo')
    ) {
      setTasksByStatus(newTasksByStatus);
      dispatch(changeTaskStatus(draggedTask.id, destination.droppableId));
    } else if (
      (source.droppableId === 'InProgress' &&
        destination.droppableId === 'QA') ||
      (source.droppableId === 'QA' && destination.droppableId === 'InProgress')
    ) {
      setTasksByStatus(newTasksByStatus);
      dispatch(changeTaskStatus(draggedTask.id, destination.droppableId));
    } else if (source.droppableId === "QA" && destination.droppableId === "Done"){
      setTasksByStatus(newTasksByStatus);
      dispatch(changeTaskStatus(draggedTask.id, destination.droppableId));
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
              {(provided, snapshot) => (
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
                  {tasksByStatus[status.title].map((item, index) => (
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
                            onClick={() => handleOnOpenModel(index)}
                            style={{ borderRadius: '7%', cursor: 'pointer' }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
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
          {/* <InputComponent
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
          /> */}
          <CkEditor />
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
