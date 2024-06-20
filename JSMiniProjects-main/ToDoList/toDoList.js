window.onload = function() {
    // Retrieve saved to-do list items from local storage
    const savedTodoList = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodoList) {
        for (let i = 0; i < savedTodoList.length; i++) {
            addTodoList(savedTodoList[i]);
        }
    }
    
    // Get the input field and add button elements
    const todoInput = document.querySelector("#todoInput");
    const addBtn = document.querySelector("#addBtn");

    // Add event listener for the add button
    addBtn.addEventListener("click", function() {
        if (todoInput.value != "") addTodoList();
    });

    // Load terms dictionary
    loadTermsDictionary();
}

function saveItems() { 
    const saveItems = []; 
    const listArea = document.querySelector(".listArea");
    for (let node of listArea.children) {
        textNode = node.querySelector("span");
        const todoObj = {
            todo: textNode.textContent,
            check: textNode.classList.contains('check')
        };
        saveItems.push(todoObj);
    }
    localStorage.setItem('todolist', JSON.stringify(saveItems));
}

function addTodoList(savedTodo) {
    const listArea = document.querySelector(".listArea");

    const liNode = document.createElement("li");
    const checkBtn = document.createElement("button");
    const todoText = document.createElement("span");
    const delBtn = document.createElement("button");

    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(delBtn);
    listArea.appendChild(liNode);

    if (savedTodo) {
        todoText.innerText = savedTodo.todo;
        if (savedTodo.check) {
            todoText.classList.add("check");
            checkBtn.innerHTML = "👍";
        }
    } else {
        todoText.innerText = todoInput.value;
        todoInput.value = "";
    }
    delBtn.innerText = "X"

    checkBtn.classList.add("checkBtn");
    todoText.classList.add("todoText");
    delBtn.classList.add("delBtn");
    saveItems();

    checkBtn.addEventListener("click", function() {
        if (checkBtn.innerHTML == "") {
            checkBtn.innerHTML = "👍";
        } else {
            checkBtn.innerHTML = "";
        }
        todoText.classList.toggle("check");
        saveItems();
    })

    delBtn.addEventListener("click", function() {
        liNode.remove();
        saveItems();
    })
}

function loadTermsDictionary() {
    fetch('terms_dictionary.json')
    .then(response => response.json())
    .then(terms => {
        const termsList = document.getElementById("termsList");
        terms.forEach(term => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="term">${term.Name} (${term.ID})</span>: ${term.Description}`;
            termsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error loading terms dictionary:', error));
}