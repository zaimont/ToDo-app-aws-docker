// Key en localStorage
const STORAGE_KEY = 'todo-tasks-v1';

// Elementos DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const tasksList = document.getElementById('tasks-list');

let tasks = [];

// Cargar tareas desde localStorage
function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  tasks = raw ? JSON.parse(raw) : [];
}

// Guardar en localStorage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Renderizar lista
function render() {
  tasksList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    const title = document.createElement('span');
    title.textContent = task.title;
    if (task.done) title.classList.add('done');

    // Acciones
    const actions = document.createElement('div');
    actions.className = 'actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.done ? '↺' : '✓';
    toggleBtn.title = 'Marcar/Desmarcar';
    toggleBtn.onclick = () => {
      task.done = !task.done;
      saveTasks(); render();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => startEdit(task.id);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Eliminar';
    delBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks(); render();
    };

    actions.appendChild(toggleBtn);
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(title);
    li.appendChild(actions);

    tasksList.appendChild(li);
  });
}

// Añadir tarea
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const newTask = { id: Date.now(), title: text, done: false, createdAt: new Date().toISOString() };
  tasks.push(newTask);
  saveTasks();
  render();
  input.value = '';
});

// Iniciar edición inline simple
function startEdit(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  const newTitle = prompt('Editar tarea:', task.title);
  if (newTitle === null) return; // cancel
  task.title = newTitle.trim() || task.title;
  saveTasks();
  render();
}

// Inicialización
loadTasks();
render();
