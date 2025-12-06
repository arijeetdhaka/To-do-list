const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

let tasks = [];

// Load tasks from localStorage (if any)
const stored = localStorage.getItem('tasks');
if (stored) {
  tasks = JSON.parse(stored);
  renderTasks();
}

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;     // if input empty, ignore
  const task = { id: Date.now(), text, done: false };
  tasks.push(task);
  saveAndRender();
  input.value = '';
});

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('completed');

    const span = document.createElement('span');
    span.innerText = task.text;
    span.addEventListener('click', () => {
      task.done = !task.done;
      saveAndRender();
    });

    const btn = document.createElement('button');
    btn.innerText = 'Delete';
    btn.classList.add('delete-btn');
    btn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveAndRender();
    });

    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}
