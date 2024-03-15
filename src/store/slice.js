import { createSlice } from '@reduxjs/toolkit';
import {
  handleFulfilledContacts,
  handlePending,
  handleRejected,
} from './handlers';
import { getContactsThunk } from './thunks';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts.items.push(payload);
    },
    deleteContact: (state, { payload }) => {
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== payload
      );
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.fulfilled, handleFulfilledContacts)
      .addCase(getContactsThunk.pending, handlePending)
      .addCase(getContactsThunk.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
