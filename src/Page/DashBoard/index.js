import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CardComponent from '../../Components/CardComponent';
import AlertDialog from '../../Components/AlertDialog';
import NotiStackComponent from '../../Components/NotiStackComponent';

function DashBoard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);

  const initialTasksByStatus = {
    ToDo: [
      { id: '1', content: 'First task' },
      { id: '2', content: 'Second task' },
      { id: '3', content: 'Third task' },
      { id: '4', content: 'Fourth task' },
      { id: '5', content: 'Fifth task' },
    ],
    InProgress: [],
    QA: [],
    Done: [],
  };

  // const taskStatus = {
  //   toDo : {
  //     name: "To do",
  //     items: todoList
  //   },
  //   requested : {
  //     name: "Requested",
  //     items: []
  //   },
  //   inProgress: {
  //     name: "In Progress",
  //     items: []
  //   },
  //   done: {
  //     name: "Done",
  //     items: []
  //   }
  // };

  const [tasks, setTasks] = useState(initialTasksByStatus);

  const notiComponent = NotiStackComponent();

  const handleDeleteTodo = (id) => {
    setSelectedDeleteIndex(id);
    setOpenDialog(true);
  };

  const handleCloseAlert = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteIndex !== null) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        ToDo: prevTasks.ToDo.filter((task) => task.id !== selectedDeleteIndex),
        InProgress: prevTasks.InProgress.filter(
          (task) => task.id !== selectedDeleteIndex
        ),
        QA: prevTasks.QA.filter((task) => task.id !== selectedDeleteIndex),
        Done: prevTasks.Done.filter((task) => task.id !== selectedDeleteIndex),
      }));

      setSelectedDeleteIndex(null);
      setOpenDialog(false);
      notiComponent.showSnackbar(`ToDo Deleted successfully!`, 'success');
    }
  };

  // const onDragEnd = (result) => {
  //   if (!result.destination) {
  //     return;
  //   }

  //   const { source, destination } = result;

  //   // task ne copy kare
  //   const newTasksByStatus = { ...tasks };

  //   // source math task ne remove kare
  //   const [draggedTask] = newTasksByStatus[source.droppableId].splice(
  //     source.index,
  //     1
  //   );

  //   // destination ma task ne add kare
  //   newTasksByStatus[destination.droppableId].splice(
  //     destination.index,
  //     0,
  //     draggedTask
  //   );

  //   setTasks(newTasksByStatus);
  // };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const { source, destination } = result;
    console.log("source:",source);
    console.log("destination:",destination);
    const sourceStatus = source?.droppableId;
    console.log("sourceStatus:",sourceStatus);
    const destStatus = destination?.droppableId;
    console.log("destStatus:",destStatus);
    const sourceIndex = source.index;
    console.log("sourceIndex:",sourceIndex);
    const destIndex = destination.index;
    console.log("destIndex:",destIndex);
  
    // Make a copy of tasks
    const updatedTasks = { ...tasks };
    console.log("updatedTasks:",updatedTasks)
  
    // Remove the task from the source list
    const [draggedTask] = updatedTasks[sourceStatus].splice(sourceIndex, 1);
    console.log("draggedTask:",draggedTask);
  
    // Add the task to the destination list
    updatedTasks[destStatus].splice(destIndex, 0, draggedTask);
  
    setTasks(updatedTasks);
  };
  

  // Object.entries(tasks).map(([name,list],index)=>{console.log([name,list])})
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Jira Board</h1>

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
                          {/* <div style={{width:"50%"}}>{item?.description}</div> */}
                          <CardComponent
                            onDelete={() => handleDeleteTodo(item?.id)}
                            // title={item?.title}
                            content={item?.content}
                            // onClick={() => handleOnOpenModel(index)}
                            style={{ borderRadius: '7%' }}
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
