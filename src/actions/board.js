import axios from 'axios';
import { setAlert } from './alert';
import { useSelector, useDispatch } from 'react-redux';
import {
  CLEAR_BOARD,
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  RENAME_BOARD,
  GET_LIST,
  ADD_LIST,
  RENAME_LIST,
  ARCHIVE_LIST,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
  ARCHIVE_CARD,
  DELETE_CARD,
  GET_ACTIVITY,
  ADD_MEMBER,
  MOVE_LIST,
  ADD_CARD_MEMBER,
  ADD_CHECKLIST_ITEM,
  EDIT_CHECKLIST_ITEM,
  COMPLETE_CHECKLIST_ITEM,
  DELETE_CHECKLIST_ITEM,
} from './types';
import setAuthToken from '../utils/setAuthToken';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get boards
export const getBoards = () => async (dispatch) => {
  // const config = {
  //   headers: {
  //     'Authorization':'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vamVsbG8tYjgzNjIiLCJhdWQiOiJqZWxsby1iODM2MiIsImF1dGhfdGltZSI6MTY0Mjg0MTEzMSwidXNlcl9pZCI6InNrbm1KQ2FGaVBSa3FKaDNkN21NRTk4MDUxUzIiLCJzdWIiOiJza25tSkNhRmlQUmtxSmgzZDdtTUU5ODA1MVMyIiwiaWF0IjoxNjQyODQxMTMxLCJleHAiOjE2NDI4NDQ3MzEsImVtYWlsIjoiZ2hvc2hhbC5yYWphcnNoaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ2hvc2hhbC5yYWphcnNoaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.clpgcPSvfWT-LmISzZkc2tDGh5Gf_UoxR1qrc_M-Vk1dq8RuGesREMdPc1JE2lpCIlzSywDMiYW_7pVZAyEanf5qA6G4yC99rNS6skVdZmM9PUgC9xSyMrnOTuWMcaJy9jRa8zPzeo--NzgcswLm0odM76I9TR5Ae_Vz-GD5YMvwIEHOYCMccGcTbXuZZEf7VZj2IjOE3wdxU0zBOQ10sgcqXKbmoOygqUono7ugswnbp3LuNpMwIr6rkT74PmE2Jop4K1egxLb9U_Mzm1CgS8qpelpUBWsEHlfm8Cq-8lOXK69jnmH0FqHn6JegIBVgYbibxGHg8CY178GlGP2u4A'
  //   },
  // };
  console.log('hi from get board',config);
  try {
    dispatch({ type: CLEAR_BOARD });
    setAuthToken();
    const res = await axios.get('https://jello-1.herokuapp.com/api/boards');
    // const res = await axios.get('http://localhost:5000/api/boards',{headers: {
    //   'Authorization':"eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vamVsbG8tYjgzNjIiLCJhdWQiOiJqZWxsby1iODM2MiIsImF1dGhfdGltZSI6MTY0Mjg0NzAwMiwidXNlcl9pZCI6InNrbm1KQ2FGaVBSa3FKaDNkN21NRTk4MDUxUzIiLCJzdWIiOiJza25tSkNhRmlQUmtxSmgzZDdtTUU5ODA1MVMyIiwiaWF0IjoxNjQyODQ3MDAyLCJleHAiOjE2NDI4NTA2MDIsImVtYWlsIjoiZ2hvc2hhbC5yYWphcnNoaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ2hvc2hhbC5yYWphcnNoaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.goSQYsUrFd6_nwXhHlQoImiNtGNG_C3NBK_CUVatElyVNfO41v8fFw7eXEaFcu_0lCeBfRSLnV92ye8EThMZzpQAk-JRfyeRK5gy2PrBs5oD6Hlck0Iasz7JBB1odNWor97Zym6NUrBtHyLIzz-Q1I-AK7kErxyh9Wr7AWwC0Le7tfk4OswtMHTCcd2rZXF05d62w_bsh1vjVkUDeUqkQN_s8WaMZRoOZlFyvlq5VEBB4M39xaVf21Vpz80fyTReR2NgWPcQ0_qu6RZaiH1gTSjI_3Wu3uUqsVPbQaajnWDfco-cd57P2QvX6WRIS9IZc6OAkNgQlUhWfy8Kkh3EVA"
    // }
    // });

    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get board
export const getBoard = (id) => async (dispatch) => {
  try {
    setAuthToken();
    const res = await axios.get(`https://jello-1.herokuapp.com/api/boards/${id}`);

    if (res) {
      axios.defaults.headers.common['boardId'] = id;
    } else {
      delete axios.defaults.headers.common['boardId'];
    }

    dispatch({
      type: GET_BOARD,
      payload: { ...res.data, listObjects: [], cardObjects: [] },
    });
  } catch (err) {
    
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add board
export const addBoard = (formData, history) => async (dispatch) => {
  console.log('hi from add board');
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post('https://jello-1.herokuapp.com/api/boards', body, config);

    dispatch({
      type: ADD_BOARD,
      payload: res.data,
    });

    dispatch(setAlert('Board Created', 'success'));

    history.push(`/board/${res.data._id}`);
  } catch (err) {
    console.log(err);
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// Rename board
export const renameBoard = (boardId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`https://jello-1.herokuapp.com/api/boards/rename/${boardId}`, formData, config);

    dispatch({
      type: RENAME_BOARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get list
export const getList = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://jello-1.herokuapp.com/api/lists/${id}`);

    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add list
export const addList = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post('https://jello-1.herokuapp.com/api/lists', body, config);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Rename list
export const renameList = (listId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`https://jello-1.herokuapp.com/api/lists/rename/${listId}`, formData, config);

    dispatch({
      type: RENAME_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Archive/Unarchive list
export const archiveList = (listId, archive) => async (dispatch) => {
  try {
    const res = await axios.patch(`https://jello-1.herokuapp.com/api/lists/archive/${archive}/${listId}`);

    dispatch({
      type: ARCHIVE_LIST,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get card
export const getCard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://jello-1.herokuapp.com/api/cards/${id}`);

    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add card
export const addCard = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post('https://jello-1.herokuapp.com/api/cards', body, config);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit card
export const editCard = (cardId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`https://jello-1.herokuapp.com/api/cards/edit/${cardId}`, formData, config);

    dispatch({
      type: EDIT_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Move card
export const moveCard = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.patch(`https://jello-1.herokuapp.com/api/cards/move/${cardId}`, body, config);

    dispatch({
      type: MOVE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Archive/Unarchive card
export const archiveCard = (cardId, archive) => async (dispatch) => {
  try {
    const res = await axios.patch(`https://jello-1.herokuapp.com/api/cards/archive/${archive}/${cardId}`);

    dispatch({
      type: ARCHIVE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete card
export const deleteCard = (listId, cardId) => async (dispatch) => {
  try {
    const res = await axios.delete(`https://jello-1.herokuapp.com/api/cards/${listId}/${cardId}`);

    dispatch({
      type: DELETE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get activity
export const getActivity = () => async (dispatch) => {
  try {
    const boardId = axios.defaults.headers.common['boardId'];

    const res = await axios.get(`https://jello-1.herokuapp.com/api/boards/activity/${boardId}`);

    dispatch({
      type: GET_ACTIVITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add member
export const addMember = (userId) => async (dispatch) => {
  try {
    const res = await axios.put(`https://jello-1.herokuapp.com/api/boards/addMember/${userId}`);

    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Move list
export const moveList = (listId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.patch(`https://jello-1.herokuapp.com/api/lists/move/${listId}`, body, config);

    dispatch({
      type: MOVE_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add card member
export const addCardMember = (formData) => async (dispatch) => {
  try {
    const { add, cardId, userId } = formData;

    const res = await axios.put(`https://jello-1.herokuapp.com/api/cards/addMember/${add}/${cardId}/${userId}`);

    dispatch({
      type: ADD_CARD_MEMBER,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add checklist item
export const addChecklistItem = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post(`https://jello-1.herokuapp.com/api/checklists/${cardId}`, body, config);

    dispatch({
      type: ADD_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit checklist item
export const editChecklistItem = (cardId, itemId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.patch(`https://jello-1.herokuapp.com/api/checklists/${cardId}/${itemId}`, body, config);

    dispatch({
      type: EDIT_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Complete/Uncomplete checklist item
export const completeChecklistItem = (formData) => async (dispatch) => {
  try {
    const { cardId, complete, itemId } = formData;

    const res = await axios.patch(`https://jello-1.herokuapp.com/api/checklists/${cardId}/${complete}/${itemId}`);

    dispatch({
      type: COMPLETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete checklist item
export const deleteChecklistItem = (cardId, itemId) => async (dispatch) => {
  try {
    const res = await axios.delete(`https://jello-1.herokuapp.com/api/checklists/${cardId}/${itemId}`);

    dispatch({
      type: DELETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};