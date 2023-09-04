const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemList = document.querySelector(".todo-items");

// init array
let todos = [];

// eventlistener som lyssnar på click och lägger till en todo i vår array
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

// metod för att lägga till en ny todo i vår array
function addTodo(item) {
  if (item != "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    todos.push(todo);

    console.log(todos);

    // lägg till i localStorage
    addToLocalStorage(todos);

    // clear input
    todoInput.value = "";
  }
}

// funktion för att uppdatera DOM
function addToDOM(todos) {
  todoItemList.innerHTML = "";

  todos.forEach(function (item) {
    // check om item är completed
    const checked = item.completed ? "checked" : null;

    // skapa <li></li> element
    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);

    if (item.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>`;

    todoItemList.append(li);
  });
}

// funktion för att spara i localStorage
function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));

  // addToDom
  addToDOM(todos);
}

// kunna hämta allt från localStorage
function getFromLocalStorage() {
  const ref = localStorage.getItem("todos");

  if (ref) {
    todos = JSON.parse(ref);
    addToDOM(todos);
  }
}

getFromLocalStorage();

// en funktion för att toggla om en todo är avslutad
function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

// funktion för att ta bort ifrån localStorage
function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

todoItemList.addEventListener("click", function (event) {
  // kolla om eventet är klicka checkbox
  if (event.target.type === "checkbox") {
    // toggla state
    toggle(event.target.parentElement.getAttribute("data-key"));
  }

  // kolla om eventet är delete
  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});
