import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  BASE_URL,
  BOARDROOM_BY_ID_URL,
  CREATE_BOARDROOM_CONTACT_URL,
  DELETE_BOARDROOM_CONTACT_URL,
  LOCK_BOARDROOM_URL,
  UNLOCK_BOARDROOM_URL,
} from "../../constants";
import { toast } from "react-toastify";
import {
  lockOrUnLockFetchedBoardroom,
  removeLockedBoardroom,
} from "./lockedBoardroomSLice";
import { lockOrUnLockFetchedHomeBoardroom } from "./boardroomSlice";

const initialState = {
  isSavingContact: false,
  isDeletingContact: false,
  isLocking: false,
  isUnlocking: false,
  isLoading: false,
  boardroom: null,
  error: null,
};

const fetchBoardroomById = createAsyncThunk(
  "selectedBoardrom/fetchBoardroomById",
  async (boardroomId) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(BOARDROOM_BY_ID_URL(boardroomId))
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const createBoardroomContact = createAsyncThunk(
  "selectedBoardrom/createBoardroomContact",
  async ({ boardroomId, contact }, { rejectWithValue }) => {
    try {
      const resp = await apiClient.post(
        BASE_URL.concat(CREATE_BOARDROOM_CONTACT_URL(boardroomId)),
        contact
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const removeBoardroomContact = createAsyncThunk(
  "selectedBoardrom/removeBoardroomContact",
  async ({ boardroomId, contactId }, { rejectWithValue }) => {
    try {
      await apiClient.delete(
        BASE_URL.concat(DELETE_BOARDROOM_CONTACT_URL(boardroomId, contactId))
      );
      return contactId;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const lockBoardroom = createAsyncThunk(
  "selectedBoardrom/lockBoardroom",
  async ({ boardroomId, reason }, { rejectWithValue, dispatch }) => {
    try {
      await apiClient.post(
        BASE_URL.concat(LOCK_BOARDROOM_URL(boardroomId)),
        reason
      );
      dispatch(
        lockOrUnLockFetchedBoardroom({ boardroomId, lockOrUnlock: true })
      );
      dispatch(
        lockOrUnLockFetchedHomeBoardroom({ boardroomId, lockOrUnlock: true })
      );
      return boardroomId;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const unLockBoardroom = createAsyncThunk(
  "selectedBoardrom/unLockBoardroom",
  async (boardroomId, { rejectWithValue, dispatch }) => {
    try {
      await apiClient.patch(BASE_URL.concat(UNLOCK_BOARDROOM_URL(boardroomId)));
      dispatch(removeLockedBoardroom(boardroomId));
      dispatch(
        lockOrUnLockFetchedHomeBoardroom({ boardroomId, lockOrUnlock: false })
      );
      return boardroomId;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const selectedBoardroomSlice = createSlice({
  name: "selectedBoardroom",
  initialState: initialState,
  reducers: {
    setIsDeletingContact: (state, action) => {
      state.isDeletingContact = action.payload;
    },
    setIsLocking: (state, action) => {
      state.isLocking = action.payload;
    },
    setIsUnlocking: (state, action) => {
      state.isUnlocking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardroomById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardroomById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardroom = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBoardroomById.rejected, (state, action) => {
      state.isLoading = false;
      state.boardroom = null;
      state.error = action.payload;
    });
    // Create boardroomContact
    builder.addCase(createBoardroomContact.pending, (state) => {
      state.isSavingContact = true;
    });
    builder.addCase(createBoardroomContact.fulfilled, (state, action) => {
      state.isSavingContact = false;
      state.boardroom.boardroomContacts.push(action.payload);
      state.error = null;
      toast.success("Contact created successfully");
    });
    builder.addCase(createBoardroomContact.rejected, (state, action) => {
      state.isSavingContact = false;
      state.error = action.payload;
    });
    // Remove boardroom contact
    builder.addCase(removeBoardroomContact.pending, (state) => {
      state.isDeletingContact = true;
    });
    builder.addCase(removeBoardroomContact.fulfilled, (state, action) => {
      state.isDeletingContact = false;
      state.boardroom.boardroomContacts = [
        ...state.boardroom.boardroomContacts.filter(
          (contact) => contact.id !== action.payload
        ),
      ];
      state.error = null;
      toast.success("Contact removed successfully");
    });
    builder.addCase(removeBoardroomContact.rejected, (state, action) => {
      state.isDeletingContact = false;
      state.error = action.payload;
    });
    // Lock boardroom
    builder.addCase(lockBoardroom.pending, (state) => {
      state.isLocking = true;
    });
    builder.addCase(lockBoardroom.fulfilled, (state) => {
      state.isLocking = false;
      state.boardroom.locked = true;
      state.error = null;
      toast.success("Boardroom is now locked");
    });
    builder.addCase(lockBoardroom.rejected, (state, action) => {
      state.isLocking = false;
      state.error = action.payload;
    });
    // Unlock boardroom
    builder.addCase(unLockBoardroom.pending, (state) => {
      state.isUnlocking = true;
    });
    builder.addCase(unLockBoardroom.fulfilled, (state) => {
      state.isUnlocking = false;
      state.boardroom.locked = false;
      state.error = null;
      toast.success("Boardroom is now unlocked");
    });
    builder.addCase(unLockBoardroom.rejected, (state, action) => {
      state.isUnlocking = false;
      state.error = action.payload;
    });
  },
});

export default selectedBoardroomSlice.reducer;
export const { setIsDeletingContact, setIsLocking, setIsUnlocking } =
  selectedBoardroomSlice.actions;
export {
  fetchBoardroomById,
  createBoardroomContact,
  removeBoardroomContact,
  lockBoardroom,
  unLockBoardroom,
};
