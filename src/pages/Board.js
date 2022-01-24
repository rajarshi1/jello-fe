import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getBoard, moveCard, moveList } from '../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../components/board/BoardTitle';
import BoardDrawer from '../components/board/BoardDrawer';
import List from '../components/list/List';
import CreateList from '../components/board/CreateList';
import Members from '../components/board/Members';
import Navbar from '../components/other/Navbar';

const Board = ({ match }) => {
  
  const board = useSelector((state) => state.board.board);

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if(params?.id){
      dispatch(getBoard(params.id));
    }
  },[params]);

  useEffect(() => {
    if (board?.title) document.title = board.title + ' | Jello';
  }, [board?.title]);

//   if (!isAuthenticated) {
//     return <Navigate to='/' />;
//   }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === 'card') {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return !board ? (
    <Fragment>
      <Navbar />
      {/* <Box className='board-loading'>
        <CircularProgress />
      </Box> */}
    </Fragment>
  ) : (
    <div
      className='board-and-navbar'
      style={{
        backgroundImage:
          'url(' +
          (board.backgroundURL
            ? board.backgroundURL
            : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80') +
          ')',
      }}
    >
      <Navbar />
      <section className='board'>
        <div className='board-top'>
          <div className='board-top-left'>
            <BoardTitle board={board} />
            <Members />
          </div>
          <BoardDrawer />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-lists' direction='horizontal' type='list'>
            {(provided) => (
              <div className='lists' ref={provided.innerRef} {...provided.droppableProps}>
                {board.lists.map((listId, index) => (
                  <List key={listId} listId={listId} index={index} />
                ))}
                {provided.placeholder}
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};

export default Board;