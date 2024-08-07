import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript",
  isOwner: boolean;
}

const initialstate: CompilerSliceStateType = {
  fullCode: {
    html: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <form id="task-form">
          <input type="text" id="task-input" placeholder="Enter a new task" required>
          <button type="submit">Add Task</button>
        </form>
        <ul id="task-list"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>`,

    css: `body {
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f9fc;
    margin: 0;
}

.container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
}

form {
    display: flex;
    justify-content: center;
}

input[type="text"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 70%;
}

button {
    padding: 10px;
    border: none;
    background-color: #5cb85c;
    color: white;
    border-radius: 4px;
    margin-left: 10px;
    cursor: pointer;
}

button:hover {
    background-color: #4cae4c;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #f4f4f4;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li.completed {
    text-decoration: line-through;
    color: #888;
}

li button {
    background: none;
    border: none;
    cursor: pointer;
}

li button.delete {
    color: #d9534f;
}

li button.delete:hover {
    color: #c9302c;
}`,

    javascript: `document.addEventListener('DOMContentLoaded', function () {
    var taskForm = document.getElementById('task-form');
    var taskInput = document.getElementById('task-input');
    var taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(task) {
        var li = document.createElement('li');
        
        var span = document.createElement('span');
        span.textContent = task;
        li.appendChild(span);
        
        var div = document.createElement('div');
        
        var completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.textContent = '✔️';
        div.appendChild(completeButton);
        
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = '❌';
        div.appendChild(deleteButton);
        
        li.appendChild(div);
        taskList.appendChild(li);

        completeButton.addEventListener('click', function () {
            li.classList.toggle('completed');
        });

        deleteButton.addEventListener('click', function () {
            taskList.removeChild(li);
        });
    }
});`,
  },
  currentLanguage: "html",
  isOwner: false,
};

const CompilerSlice = createSlice({
  name: "compilerSlice",
  initialState: initialstate,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },

    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },

    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },

    updateIsOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload;
    },
  },
});

export default CompilerSlice.reducer;

export const { updateCurrentLanguage, updateCodeValue, updateFullCode, updateIsOwner } = CompilerSlice.actions;
