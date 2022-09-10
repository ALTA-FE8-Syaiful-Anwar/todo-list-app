import React, { useEffect, useState } from 'react';
import Todo from '../component/todo';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../App.css';


const HomePage = () => {

    const [todo, setTodo] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const getData = async() => {
        var config = {
            method: 'get',
            url: 'https://api.todoist.com/rest/v2/tasks',
            headers: { 
              'Authorization': 'Bearer eee262c83529a3e7fe8e0c11ebd5df2260af33e1', 
            }
          };
        await axios(config)
          .then((response) => {
            setTodo(response.data)
          })
    };

    useEffect(() => {
        getData();
        handleDelete();
        handleSubmit();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [newContent, setNewContent] = useState();
    const [newDesc, setNewDesc] = useState();
    const [newDue, setNewDue] = useState();

    const handleSubmitAddTodo = () => {
        var data = {
            content: newContent,
            description: newDesc,
            due: newDue
          };
          console.log(data)
          
          var config = {
            method: 'post',
            url: 'https://api.todoist.com/rest/v2/tasks',
            headers: { 
              'Authorization': 'Bearer eee262c83529a3e7fe8e0c11ebd5df2260af33e1', 
              'Content-Type': 'application/json', 
            },
            data : data
          };
          axios(config)
            .then(function (response) {
            console.log(response.data);
            getData();
            })
    }
    const handleContent = (e) => {
        setNewContent(e.target.value);
    };
    const handleDesc = (e) => {
        setNewDesc(e.target.value);
    };
    const handleDue = (e) => {
        setNewDue(e.target.value);
    };

    const handleDelete = (id) => {
        var config = {
            method: 'delete',
            url: `https://api.todoist.com/rest/v2/tasks/${id}`,
            headers: { 
              'Authorization': 'Bearer eee262c83529a3e7fe8e0c11ebd5df2260af33e1', 
            }
        };
        axios(config)
        .then(function (response) {
        console.log(response.data);
        getData();
        });
    }

    const goToDetail = (item) => {
        navigate('/detail-todo', {
            state: {
                content: item.content,
                description: item.description,
                created: item.created,
                id: item.id
            }
        })
    }

  return (
    <Container className='todo-app'>
        <h1>What's the Plan for Today?</h1>
        <div className='d-grid justify-content-center'>
            <div>
                <Search />
            </div>
        </div>
        <div className='pb-3'>
        <Button variant="primary" onClick={handleShow}>
            Add Todo
        </Button>
        <AddTodo 
            show={show} 
            handleClose={handleClose} 
            submit={handleSubmit} 
            handleContent={handleContent}
            handleDesc={handleDesc}
            handleDue={handleDue}
        />
        </div>
        <div className='border-secondary'>
            {todo.map((item) => {
                return (
                    <Todo 
                        content={item.content}
                        delete={() => handleDelete(item.id)}
                        detail={() => goToDetail(item)}
                    />
                )
            })}
        </div>
    </Container>
  )
}

export default HomePage