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

const url = 'https://jello-2.herokuapp.com'
// const url = 'http://localhost:5000'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get boards
export const getBoards = () => async (dispatch) => {
 
  try {
    dispatch({ type: CLEAR_BOARD });
    setAuthToken();
    
    
    // const res = await axios.get('https://jello-1.herokuapp.com/api/boards');
    const res = await axios.get(`${url}/api/boards`
    //   ,{headers: {
    //   // 'Authorization': localStorage.getItem('token')
    //   'Authorization': ''
    // }
    // }
    );

   

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
    // const res = await axios.get(`https://jello-1.herokuapp.com/api/boards/${id}`);
    const res = await axios.get(`${url}/api/boards/${id}`,{headers: {
      // 'Authorization': localStorage.getItem('token')
      // 'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vamVsbG8tYjgzNjIiLCJhdWQiOiJqZWxsby1iODM2MiIsImF1dGhfdGltZSI6MTY0Mjg0OTE5MCwidXNlcl9pZCI6InNrbm1KQ2FGaVBSa3FKaDNkN21NRTk4MDUxUzIiLCJzdWIiOiJza25tSkNhRmlQUmtxSmgzZDdtTUU5ODA1MVMyIiwiaWF0IjoxNjQyODU4NTAzLCJleHAiOjE2NDI4NjIxMDMsImVtYWlsIjoiZ2hvc2hhbC5yYWphcnNoaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ2hvc2hhbC5yYWphcnNoaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.YRXfJSS47_ABr6DmSnP2qBJkjqGfLvwKI2axms1ycrJ2MiRB2jlBUBKqMjfC13BjqqXmcdzyhqjoTU-au6xdzsJvlQHXm6RS2NpL-J4XOkt0vLQmSEaMTukAZ8sYJWUhuegvIvOR1DzWWUEfp1Dq3pxFGMvIIthNogRDfVfeF2ANAUrwHWnkvudK_r5TiLe0UHMUquiHnW6Lat59AY2Fb8vgtSqzDombb9Xt2JiZVpuRUz67RGXkwyTLsAx9A_LrUTJGnbjyk1QpFMJ86NQbP24Iu_mpB_7y6_qfq9dLuLgxamrmNv5PA1wJ2BqFh8m9V_vzsgBp2XAV119m3UqUUQ'
    }
    });

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
  
  try {
    const body = JSON.stringify(formData);
    const res = await axios.post(`${url}/api/boards`, body, config);
    // const res = await axios.post('http://localhost:5000/api/boards/',{headers: {
    //   // 'Authorization': localStorage.getItem('token')
    //   'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vamVsbG8tYjgzNjIiLCJhdWQiOiJqZWxsby1iODM2MiIsImF1dGhfdGltZSI6MTY0Mjg0OTE5MCwidXNlcl9pZCI6InNrbm1KQ2FGaVBSa3FKaDNkN21NRTk4MDUxUzIiLCJzdWIiOiJza25tSkNhRmlQUmtxSmgzZDdtTUU5ODA1MVMyIiwiaWF0IjoxNjQyODU4NTAzLCJleHAiOjE2NDI4NjIxMDMsImVtYWlsIjoiZ2hvc2hhbC5yYWphcnNoaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ2hvc2hhbC5yYWphcnNoaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.YRXfJSS47_ABr6DmSnP2qBJkjqGfLvwKI2axms1ycrJ2MiRB2jlBUBKqMjfC13BjqqXmcdzyhqjoTU-au6xdzsJvlQHXm6RS2NpL-J4XOkt0vLQmSEaMTukAZ8sYJWUhuegvIvOR1DzWWUEfp1Dq3pxFGMvIIthNogRDfVfeF2ANAUrwHWnkvudK_r5TiLe0UHMUquiHnW6Lat59AY2Fb8vgtSqzDombb9Xt2JiZVpuRUz67RGXkwyTLsAx9A_LrUTJGnbjyk1QpFMJ86NQbP24Iu_mpB_7y6_qfq9dLuLgxamrmNv5PA1wJ2BqFh8m9V_vzsgBp2XAV119m3UqUUQ'
    // }
    // });
    console.log(res);
    dispatch({
      type: ADD_BOARD,
      payload: res.data,
    });

    dispatch(setAlert('Board Created', 'success'));

    // history.push(`/board/${res.data._id}`);
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
    const res = await axios.patch(`${url}/api/boards/rename/${boardId}`, formData, config);

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
    const res = await axios.get(`${url}/api/lists/${id}`);
    

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

    // const res = await axios.post('https://jello-1.herokuapp.com/api/lists', body, config);
    const res = await axios.post(`${url}/api/lists`, body, config);

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
    const res = await axios.patch(`${url}/api/lists/rename/${listId}`, formData, config);

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
    const res = await axios.patch(`${url}/api/lists/archive/${archive}/${listId}`);

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
    const res = await axios.get(`${url}/api/cards/${id}`);

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

    const res = await axios.post(`${url}/api/cards`, body, config);

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
    const res = await axios.patch(`${url}/api/cards/edit/${cardId}`, formData, config);
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

    const res = await axios.patch(`${url}/api/cards/move/${cardId}`, body, config);

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
    const res = await axios.patch(`${url}/api/cards/archive/${archive}/${cardId}`);

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
    const res = await axios.delete(`${url}/api/cards/${listId}/${cardId}`);

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

    // const res = await axios.get(`https://jello-1.herokuapp.com/api/boards/activity/${boardId}`);
    const res = await  axios.get(`${url}/api/boards/activity/${boardId}`);

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
export const addMember = (email) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}/api/boards/addMember/${email}`);

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

    const res = await axios.patch(`${url}/api/lists/move/${listId}`, body, config);

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
    const res = await axios.put(`${url}/api/cards/addMember/${add}/${cardId}/${userId}`);

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

    const res = await axios.post(`${url}/api/checklists/${cardId}`, body, config);

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

    const res = await axios.patch(`${url}/api/checklists/${cardId}/${itemId}`, body, config);

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

    const res = await axios.patch(`${url}/api/checklists/${cardId}/${complete}/${itemId}`);

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
    const res = await axios.delete(`${url}/api/checklists/${cardId}/${itemId}`);

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