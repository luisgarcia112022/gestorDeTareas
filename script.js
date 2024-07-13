let tasks = [];

// Función para agregar una nueva tarea
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        renderTasks();
        saveTasks(); // Guardar las tareas actualizadas en localStorage
        taskInput.value = '';
    }
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks(); // Guardar las tareas actualizadas en localStorage
}

// Función para marcar/desmarcar una tarea como completada
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    saveTasks(); // Guardar las tareas actualizadas en localStorage
}

// Función para editar el texto de una tarea
function editTask(index, newText) {
    tasks[index].text = newText;
    renderTasks();
    saveTasks(); // Guardar las tareas actualizadas en localStorage
}

// Función para comenzar la edición de una tarea
function startEditing(index) {
    const newText = prompt('Editar tarea:', tasks[index].text);
    if (newText !== null) {
        editTask(index, newText.trim());
    }
}

// Función para limpiar todas las tareas completadas
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
    saveTasks(); // Guardar las tareas actualizadas en localStorage
}

// Función para filtrar las tareas según su estado (todas, pendientes, completadas)
function filterTasks(filter) {
    let filteredTasks = [];

    if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks; // Mostrar todas las tareas
    }

    renderFilteredTasks(filteredTasks);
}

// Función para guardar las tareas en localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar las tareas desde localStorage al cargar la página
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Función para actualizar el contador de tareas pendientes
function updateTaskCount() {
    const pendingTasksCount = tasks.filter(task => !task.completed).length;
    const taskCountElement = document.getElementById('taskCount');
    taskCountElement.textContent = `Tareas pendientes: ${pendingTasksCount}`;
}

// Función para renderizar la lista de tareas filtradas en el HTML
function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', () => toggleTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteTask(index);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            startEditing(index);
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    updateTaskCount();
}

// Función para renderizar todas las tareas en el HTML
function renderTasks() {
    renderFilteredTasks(tasks); // Mostrar todas las tareas por defecto
}

// Llamar a loadTasks al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});