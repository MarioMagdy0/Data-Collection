import React , { useState, useRef } from 'react';
import Card from '../UI/Card';
import classes from "./AddUser.module.css";
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    
    const [error, setErorr] = useState();


    const addUserHandler = (event) =>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0){
            setErorr({
                title : 'Invalid input.',
                message : 'Please enter a valid name and age (non-empty values).'
            });
            return;
        }
        if (+enteredUserAge < 1 ){
            setErorr({
                title : 'Invalid age.',
                message : 'Please enter a valid age (> 0).'
            });
            return;
        }
        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value ='';
        ageInputRef.current.value ='';
    };


    const errorhandler = () => {
        setErorr(null);
    };

    return <Wrapper> 
        {error && <ErrorModal title = {error.title} message ={error.message} onConfirm = {errorhandler}/>}
    <Card className={classes.input}> 
        <form onSubmit={addUserHandler}>
        <label htmlfor="username" >Username</label>
        <input type='text' id='username' 
        ref={nameInputRef}
        />
        <label htmlfor="age" >Age (Years)</label>
        <input type='text' id='age' 
        ref={ageInputRef}
        />
        <Button type="submit">Add User</Button>
    </form>
    </Card>
    </Wrapper>
    ;
};

export default AddUser;