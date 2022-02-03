import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addCardMember } from '../../actions/board';
import { Checkbox, FormGroup, FormControlLabel, FormControl } from '@material-ui/core';
import useStyles from '../../utils/modalStyles';

const CardMembers = ({ card }) => {  
  const classes = useStyles();
  const boardMembers = useSelector((state) => state.board.board.members);
  const members = card.members.map((member) => member.user);
  const dispatch = useDispatch();
  const [assignedUsers, setAssignedUsers] = useState({})
  // console.log(members,boardMembers);

  useEffect(()=>{
    let tempAssignedUser={};
    if(Array.isArray(boardMembers)){
      boardMembers.forEach(boardMember=>{
        tempAssignedUser[boardMember.user]=members && members.includes(boardMember.user)
      })
    }
    setAssignedUsers(tempAssignedUser)
    // console.log(tempAssignedUser);
  },[])
  
  return (
    <div>
      <h3 className={classes.membersTitle}>Members</h3>
      <FormControl component='fieldset'>
        <FormGroup>
          {boardMembers.map((member) => (
            <FormControlLabel
              key={member.user}
              control={
                <Checkbox
                  // checked={members.indexOf(member.user) !== -1}
                  checked={assignedUsers[member.user]===true}
                  // checked={true}
                  onChange={async (e) =>{
                    let tempUser = {...assignedUsers}
                    tempUser[member.user]=e.target.checked;
                    console.log(e.target.checked);
                    dispatch(
                      addCardMember({
                        add: e.target.checked,
                        cardId: card._id,
                        userId: member.email,
                      })
                    )
                    setAssignedUsers(tempUser)
                  }
                }
                  name={member.user}
                />
              }
              label={member.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

CardMembers.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardMembers;