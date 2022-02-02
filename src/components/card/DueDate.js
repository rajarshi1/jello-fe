import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editCard } from '../../actions/board';
import {Button } from '@material-ui/core';
import DateTimePicker from 'react-datetime-picker'
import useStyles from '../../utils/modalStyles';

const DueDate = ({ cardId,card,title,description }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    console.log(cardId,card.title, card.description,card);

    const [value, onChange] = useState(new Date());

    const handleSubmit = async () => {
        // e.preventDefault();
        const dateString = value.toDateString()
        dispatch(editCard(cardId, { title, description,dueDate:dateString }));
        console.log(value,dateString);
      };

    return (
        <div>
            <DateTimePicker
            onChange={onChange}
            value={value}
            />
            <Button
               className={classes.button}
               variant='contained'
               color='primary'
               onClick={()=>{handleSubmit()}}
            >
                 Set Due date
            </Button>
    <h3>Due Date : {card.dueDate}</h3>
            
            {/* <h3 className={classes.header}>Due Date</h3> */}
        </div>
    );
}

export default DueDate;
