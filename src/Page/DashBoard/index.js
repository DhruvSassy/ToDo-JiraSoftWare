import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector,useDispatch } from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import { addTodo, deleteTask, editTodo } from '../../redux/action';
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

const DashBoard = () => {
    const dispatch = useDispatch()
  const todoList = useSelector((state) => state.todoJira.ToDo);
  const inProgress = useSelector((state) => state.todoJira.InProgress)
  const qa = useSelector((state) => state.todoJira.QA);
  const done = useSelector((state) => state.todoJira.Done);
  console.log('todoList:', todoList);
  console.log("inProgress:",inProgress);
  console.log("qa:",qa);
  console.log("done:",done);


  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errorText, setErrorText] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);
  const [todo, setTodo] = useState({
    title: '',
    description: '',
  });

  const initialTasksByStatus = {
    ToDo: todoList,
    InProgress: inProgress,
    QA: qa,
    Done: done,
  };

  

  const [tasks, setTasks] = useState(initialTasksByStatus);

  const { title, description } = todo;

  const notiComponent = NotiStackComponent();

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
      notiComponent.showSnackbar(` ToDo added successfully!`, 'success');
    }
  };
  const handleDeleteTodo = (id) => {
    setSelectedDeleteIndex(id);
    setOpenDialog(true);
  };
  const handleOnOpenModel = (id, status) => {
    const selectedItem =
      status === 'ToDo'
        ? todoList.find((item) => item.id === id)
        : status === 'InProgress'
        ? inProgress.find((item) => item.id === id)
        : status === 'QA'
        ? qa.find((item) => item.id === id)
        : done.find((item) => item.id === id);
  
    setIsEdit(true);
    setTodo({
      id: selectedItem?.id,
      title: selectedItem?.title,
      description: selectedItem?.description,
    });
    setOpenModal(true);
  };
  
  const handleOnEdit = () => {
    const updatedTodo = {
      id: todo?.id,
      title,
      description,
    };
  
    dispatch(editTodo(updatedTodo)); // Dispatch the editTask action with the updated todo object
    handleCloseModal();
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
    notiComponent.showSnackbar(` ToDo Deleted successfully!`, 'success');
  };


  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const { source, destination } = result;
  
    // Check if the source column is "Todo" and the destination column is "In Progress"
    if ((source.droppableId === "ToDo" && destination.droppableId === "InProgress") || (source.droppableId === "InProgress" && destination.droppableId === "ToDo") ) {
      const newTasksByStatus = { ...tasks };

      // source mathi task ne remove kare
      const [draggedTask] = newTasksByStatus[source.droppableId].splice(
        source.index,
        1
      );
  
      // destination ma task ne add kare
      newTasksByStatus[destination.droppableId].splice(
        destination.index,
        0,
        draggedTask
      );
  
      setTasks(newTasksByStatus);
    } else if ((source.droppableId === "InProgress" && destination.droppableId === "QA") || (source.droppableId === "QA" && destination.droppableId === "InProgress")){
      const newTasksByStatus = { ...tasks };

      // source mathi task ne remove kare
      const [draggedTask] = newTasksByStatus[source.droppableId].splice(
        source.index,
        1
      );
  
      // destination ma task ne add kare
      newTasksByStatus[destination.droppableId].splice(
        destination.index,
        0,
        draggedTask
      );
  
      setTasks(newTasksByStatus);
    } else if (source.droppableId === "QA" && destination.droppableId === "Done"){
      const newTasksByStatus = { ...tasks };

      // source mathi task ne remove kare
      const [draggedTask] = newTasksByStatus[source.droppableId].splice(
        source.index,
        1
      );
  
      // destination ma task ne add kare
      newTasksByStatus[destination.droppableId].splice(
        destination.index,
        0,
        draggedTask
      );
  
      setTasks(newTasksByStatus);
    }
  };
  

  // Object.entries(tasks).map(([name,list],index)=>{console.log([name,list])})
  return (
    <div>
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
          {Object.entries(tasks).map(([name, list], index) => (
            <Droppable key={name} droppableId={name}>
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
                  <h2 style={{ textAlign: 'center' }}>{name}</h2>
                  <hr />
                  {list.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
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
                          {/* <div style={{width:"50%"}}>{item?.description}</div> */}
                          <CardComponent
                            onDelete={() => handleDeleteTodo(item?.id)}
                            title={item?.title}
                            description={item?.description}
                            onClick={() => handleOnOpenModel(item?.id,index)}
                            style={{borderRadius:"7%"}}
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
      </div>
    </div>
  );
}

export default DashBoard;
