// ========================Selectors

const changeTheme = document.querySelector('#changeTheme')
const todoForm = document.querySelector('#todoForm')
const formCheckbox = document.querySelector('#todoForm input[type="checkbox"]')
const formInput = document.querySelector('#todoForm input[type="text"]')
const todos = document.querySelector('#todos')
const remainingTodos = document.querySelector('#remainingTodos > span')
const all = document.querySelector('#all')
const active = document.querySelector('#active')
const completed = document.querySelector('#completed')
const clrCompleted = document.querySelector('#clrCompleted')
let todosSessionStorage = JSON.parse(sessionStorage.getItem('todos')) || []

toggleTheme()

// Sets the theme object in sessionStorage
changeTheme.addEventListener('click', () => {
    if (!document.documentElement.classList.contains('dark')) {
        sessionStorage.setItem('theme', 'dark')
    } else {
        sessionStorage.setItem('theme', 'light')
    }

    toggleTheme()
})

// ========================Event Listeners

document.addEventListener('DOMContentLoaded', allTodos)
todoForm.addEventListener('submit', submitTodo)
todos.addEventListener('click', check)
all.addEventListener('click', allTodos)
active.addEventListener('click', activeTodos)
completed.addEventListener('click', completedTodos)
clrCompleted.addEventListener('click', clrTodos)


// ========================Add Drag N' Drop feature

let todoId
// Create an instace of Sortable class and add options as per the need
new Sortable(todos, {
    animation: 150,
    ghostClass: 'sortable-ghost', // 'sortable-ghost' name is default for ghostClass in Sortable.js, so don't need to define it explicitly
    dragClass: 'opacity-0',
    delay: 150,
    delayOnTouchOnly: true,

    // Gets calleds when the item's position changes (i.e. when it gets dragged to a new location)
    onUpdate: function (e) {
        let draggedTodo
        todoId = e.item.children[0].id

        todosSessionStorage.forEach((todo, index) => {
            if (!(todo.id == todoId)) return
            draggedTodo = todosSessionStorage[index]
            todosSessionStorage.splice(index, 1)
        })

        // Calculate the new index of the dragged element
        const newIndex = (todosSessionStorage.length) - e.newIndex

        // Add that dragged element in the todoSessionStorage
        todosSessionStorage.splice(newIndex, 0, draggedTodo)

        // Store the todoSessionStorage in the sessionStorage
        sessionStorage.setItem('todos', JSON.stringify(todosSessionStorage))
    },
})


// ========================Functions

// Checks whether the user has set the prefers-color-scheme or sessionStorage.theme
// And adds/remove the class accordingly
function toggleTheme() {
    if (sessionStorage.theme === 'dark' || (!('theme' in sessionStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

function createTodo({ id, label, checked }) {
    // Container of todo task
    const todoContainer = document.createElement('div')
    todoContainer.className = 'relative flex items-center px-5 py-7'

    // Checkbox
    const checkBox = document.createElement('input')
    checkBox.className = 'checkTodo'
    checkBox.type = 'checkbox'
    checkBox.id = id
    checkBox.checked = checked

    // Checkbox gradient
    const checkBg = document.createElement('div')
    checkBg.className = 'checkBg'
    // Check img
    const img = document.createElement('img')
    img.src = '/images/icon-check.svg'
    img.alt = 'Check icon'
    checkBg.append(img)

    // Label for todo
    const todoTask = document.createElement('label')
    todoTask.className = 'todoTask'
    todoTask.htmlFor = id
    todoTask.innerText = label
    // Delete button
    const deleteTodo = document.createElement('button')
    deleteTodo.className = 'deleteTodo'

    // Append all elements to the todoContainer
    todoContainer.append(checkBox, checkBg, todoTask, deleteTodo)

    return todoContainer
}

function addTodo(todoInfo) {
    const todoContainer = createTodo(todoInfo)

    // Insert the todo at the first location
    todos.insertBefore(todoContainer, todos.firstChild)
}

function submitTodo(e) {
    e.preventDefault()

    // if input field is empty, return
    if (!formInput.value) return

    const todoInfo = {
        label: formInput.value,
        checked: formCheckbox.checked,
        id: `checkTodo${Math.round(Math.random().toFixed(5) * 100000)}`
    }

    // Add the todo
    addTodo(todoInfo)

    // Push the todo to the array
    todosSessionStorage.push(todoInfo)

    // Store the array to the sessionStorage for later use
    sessionStorage.setItem('todos', JSON.stringify(todosSessionStorage))

    // Update the results
    updateResults(todosSessionStorage)

    // Reset the form
    todoForm.reset()
}

function check(e) {
    // Check if the user has clicked on the delete button or if the user checked the todo
    if (e.target.classList.contains('checkTodo')) {
        const checkbox = e.target
        todosSessionStorage.forEach(todo => {
            if (todo.id == checkbox.id) {
                todo.checked = !todo.checked
            }
        })
        sessionStorage.setItem('todos', JSON.stringify(todosSessionStorage))

    } else if (e.target.classList.contains('deleteTodo')) {
        // Get the checkbox which is a sibling of the delete button
        const checkbox = e.target.parentElement.children[0]

        // Get the entire todo to delete it
        const parentTodo = e.target.parentElement
        todosSessionStorage.forEach((todo, index) => {
            if (todo.id == checkbox.id) {
                todosSessionStorage.splice(index, 1)
            }

        })
        // Delete the parent element of the element('.deleteTodo')
        parentTodo.remove()
        sessionStorage.setItem('todos', JSON.stringify(todosSessionStorage))
    }
    // Update the results
    updateResults(todosSessionStorage)
}

function updateResults(arr) {
    // Get the todos which are not completed
    const completedArrLength = arr.filter(todo => !todo.checked).length
    remaining = completedArrLength
    remainingTodos.innerText = remaining
}

function allTodos() {
    if (!all.classList.contains('text-primary-brightBlue')) {
        all.classList.add('text-primary-brightBlue')
    }
    active.classList.remove('text-primary-brightBlue')
    completed.classList.remove('text-primary-brightBlue')

    if (!todosSessionStorage) return

    todos.innerHTML = ''

    todosSessionStorage.forEach(todo => {
        addTodo(todo)
    })

    // Update the results
    updateResults(todosSessionStorage)
}

function activeTodos() {
    if (!active.classList.contains('text-primary-brightBlue')) {
        active.classList.add('text-primary-brightBlue')
    }
    all.classList.remove('text-primary-brightBlue')
    completed.classList.remove('text-primary-brightBlue')

    if (!todosSessionStorage) return

    todos.innerHTML = ''

    // Get all the todos which are not checked
    const checkedTodos = todosSessionStorage.filter(todo => !todo.checked)

    checkedTodos.forEach(todo => {
        addTodo(todo)
    })

    // Update the results
    updateResults(todosSessionStorage)
}

function completedTodos() {
    if (!completed.classList.contains('text-primary-brightBlue')) {
        completed.classList.add('text-primary-brightBlue')
    }
    all.classList.remove('text-primary-brightBlue')
    active.classList.remove('text-primary-brightBlue')

    if (!todosSessionStorage) return

    todos.innerHTML = ''

    // Get all the todos which are checked
    const checkedTodos = todosSessionStorage.filter(todo => todo.checked)

    checkedTodos.forEach(todo => {
        addTodo(todo)
    })

    // Update the results
    updateResults(todosSessionStorage)
}

function clrTodos() {
    for (let i = todosSessionStorage.length - 1; i >= 0; i -= 1) {
        if (todosSessionStorage[i].checked) {
            todosSessionStorage.splice(i, 1)
        }

    }

    sessionStorage.setItem('todos', JSON.stringify(todosSessionStorage))

    location.reload()
}
