import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { db } from "./firebase.js";
import {
  doc,
  updateDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import "./App.css";

import Header from "./components/Header.js";
import Todo from "./components/Todo.js";
import InputDialog from "./components/InputDialog.js";
import EditDialog from "./components/EditDialog.js";

const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));

function App() {
  //states
  const [todos, setTodos] = useState([]);
  const [isInputDialogOpen, setInputDialogOpen] = useState(false);
  const [todoInput, setTodoInput] = useState("");
  const [description, setDescription] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState("");

  const bg_color = [blue[300], grey[100]];

  const handleEditClick = (todoItem) => {
    setCurrentTodo(todoItem.todo);
    setCurrentDescription(todoItem.description);
    setCurrentTodoId(todoItem.id);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const todoRef = doc(db, "todos", currentTodoId);
      await updateDoc(todoRef, {
        todo: currentTodo,
        description: currentDescription,
      });
      console.log("Todo updated");
      setIsEditDialogOpen(false);
      setCurrentTodo("");
      setCurrentDescription("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "todos"), {
        todo: todoInput,
        description: description,
        timestamp: serverTimestamp(),
      });
      console.log("Todo added:", todoInput);
      setTodoInput("");
      setDescription("");
      setInputDialogOpen(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleOpenInputDialogBox = () => {
    setInputDialogOpen(true);
  };

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  }, [todoInput, description]);

  return (
    <div className="App">
      <Header />
      <div class="input-container">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenInputDialogBox}
        >
          Add Todo
        </Button>
        <InputDialog
          open={isInputDialogOpen}
          setOpen={setInputDialogOpen}
          todo={todoInput}
          setTodo={setTodoInput}
          description={description}
          setDescription={setDescription}
          handleAdd={handleAdd}
        />
      </div>
      {todos.map((item, index) => (
        <Todo
          key={item.id}
          arr={item}
          bgColor={bg_color[index % [bg_color.length]]}
          editClick={() => handleEditClick(item)}
        />
      ))}
      <EditDialog
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        todo={currentTodo}
        setTodo={setCurrentTodo}
        description={currentDescription}
        setDescription={setCurrentDescription}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
export default App;
