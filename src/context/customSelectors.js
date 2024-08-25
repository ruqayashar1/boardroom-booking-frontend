import { createSelector } from "@reduxjs/toolkit";

const boardrooms = (state) => state.boardroom.boardrooms;
export const boardroomSelectionList = createSelector(
  [boardrooms],
  (boardrooms) =>
    boardrooms?.map((boardroom) => ({
      id: boardroom.id,
      name: boardroom.name,
      locked: boardroom.locked,
    }))
);
