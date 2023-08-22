import { ADD_BOX, DELETE_BOX } from "./constant"

export const addBox = (box) => ({
    type:ADD_BOX,
    payload: box,
});

export const deleteBox = (index) => ({
    type: DELETE_BOX,
    payload: index,
  });