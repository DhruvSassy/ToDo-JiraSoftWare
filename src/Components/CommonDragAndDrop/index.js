import React from 'react';

function CommonDragAndDrop({
  source,
  destination,
  Status,
  draggedTaskId,
  destinationStatus,
  changeTaskStatus,
  dispatch,
}) {
  const isDragAndDropAllowed = () => {
    const allowedMappings = [
      [Status[0]?.id, Status[1]?.id],
      [Status[1]?.id, Status[0]?.id],
      [Status[1]?.id, Status[2]?.id],
      [Status[2]?.id, Status[1]?.id],
      [Status[2]?.id, Status[3]?.id],
    ];

    for (const [srcId, destId] of allowedMappings) {
      if (
        (source.droppableId === srcId && destination.droppableId === destId) ||
        (source.droppableId === destId && destination.droppableId === srcId)
      ) {
        return true;
      }
    }

    return false;
  };

  if (isDragAndDropAllowed()) {
    dispatch(changeTaskStatus(draggedTaskId, destinationStatus));
  }

  return <div>index</div>;
}

export default CommonDragAndDrop;