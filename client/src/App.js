
import React, { useState, input } from 'react';
import './App.css';

import { useQuery, useMutation } from '@apollo/client';

import gql from "graphql-tag";

const READ_TODOS = gql`
  query todos{
    todos {
      id
      text
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!) {
    updateTodo(id: $id)
  }
`;

function App() {
  const [todoText, setTodoText] = useState("");
  const { data, loading, error } = useQuery(READ_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(REMOVE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({ variables: { text: todoText } });
    setTodoText("");
  };

  const handleDelete = (id) => {
    deleteTodo({ variables: { id } });
  };

  const handleUpdate = (id, completed) => {
    updateTodo({ variables: { id, completed: !completed } });
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className="app">
      <div class="flex flex-col space-y-4 ...">

<h3 class="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600"> Welcome to Your To do app</h3>
      <form onSubmit={e => {
        e.preventDefault();
        createTodo({ variables: { text: input.value } });
        input.value = '';
        window.location.reload();
      }}>
        <div class="flex space-x-4 ...">

        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" placeholder="Enter a task or todo" ref={node => { input = node; }}></input>
        <button className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="submit">Submit</button>
      
        </div>

      </form>
      <ul>
      <div class="flex flex-col space-y-4 ">

        {data.todos.map((todo) =>
          <li key={todo.id} className="w-100">
            <div class="flex space-x-4 ...">

            <span className={todo.completed ? "done" : "pending"}>{todo.text}</span>
            <button className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out float-right" onClick={() => {
              deleteTodo({ variables: { id: todo.id } });
              window.location.reload();
            }}> Delete</button>
             <button className={`btn inline-block px-6 py-2 border-2 border-yellow-500 text-yellow-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out float-right ${todo.completed ? "inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" : "btn-info"}`} onClick={() => {
              updateTodo({ variables: { id: todo.id } });
              window.location.reload();
            }}>{todo.completed ? <span> Task Completed</span> : <span>Task Not completed</span>}</button>
         </div></li>
        )}
              </div>

      </ul>
      </div>
      </div>


  );
}

export default App;