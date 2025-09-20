let todos = [];

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (validateInput(todoInput.value, todoDate.value)) {
        const formTodo = { task: todoInput.value, date: todoDate.value }
        todos.push(formTodo);
        displayTodos(); // Re-render after adding
    }
}

function displayTodos(filteredTodos = null) {
    const todoList = document.getElementById('todo-list'); // This is the <tbody> of your table
    todoList.innerHTML = ""; // Clear table body

    const listToDisplay = filteredTodos || todos;
    listToDisplay.forEach((todo, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="border p-2">${todo.task}</td>
            <td class="border p-2">${todo.date}</td>
            <td class="border p-2">
                <button onclick="deleteTodo(${index})" class="bg-red-500 text-white rounded p-1">Delete</button>
            </td>
        `;
        todoList.appendChild(tr);
    });
}

function deleteTodo(index) {
    todos.splice(index, 1); // Remove by index
    displayTodos(); // Re-render after deleting
}

function filterTodo() {
    const filterInput = document.getElementById('filter-input').value.toLowerCase();
    const filtered = todos.filter(todo =>
        todo.task.toLowerCase().includes(filterInput) ||
        todo.date.includes(filterInput)
    );
    displayTodos(filtered);
}

function validateInput(todo, date) {
    if (todo === "" || date === "") {
        alert("Please fill in both fields.");
        return false;
    }
    return true;
}