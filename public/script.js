// =========================
// LOAD TASKS ON PAGE START
// =========================
async function loadTasks() {
  try {
    const res = await fetch('/api/tasks', {
      method: 'GET',
      credentials: 'include'
    });

    if (res.status === 401) {
      window.location.href = '/login.html';
      return;
    }

    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error('Error loading tasks:', err);
  }
}

// =========================
// ADD TASK
// =========================
async function addTask() {
  const input = document.getElementById('addTask');
  const text = input.value.trim();
  if (!text) return;

  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ task: text })
    });

    if (res.ok) {
      input.value = '';
      loadTasks();
    } else {
      alert('Failed to add task');
    }
  } catch (err) {
    console.error('Error adding task:', err);
  }
}

// =========================
// DELETE TASK
// =========================
async function deleteTask(id) {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.ok) {
      loadTasks();
    } else {
      alert('Failed to delete task');
    }
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}

// =========================
// LOGOUT
// =========================
async function logout() {
  try {
    await fetch('/logout', {
      method: 'POST',
      credentials: 'include'
    });
    window.location.href = '/login.html';
  } catch (err) {
    console.error('Logout failed:', err);
  }
}

// =========================
// THEME SWITCHER
// =========================
function setupThemePicker() {
  const themeButton = document.querySelector('.theme-button');
  const themePalette = document.querySelector('.theme-palette');
  const colorOptions = document.querySelectorAll('.color-option');
  
  themeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    themePalette.classList.toggle('open');
  });
  
  document.addEventListener('click', (e) => {
    if (!themePalette.contains(e.target) && e.target !== themeButton) {
      themePalette.classList.remove('open');
    }
  });
  
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      applyTheme(theme);
      themePalette.classList.remove('open');
    });
  });
}

async function applyTheme(theme) {
  // reset all classes
  document.body.className = '';
  document.body.classList.add(`bg-${theme}`);

  const submitBtn = document.getElementById('submitBtn');
  const logoutBtn = document.getElementById('logout');
  const checkBoxes = document.querySelectorAll('.checkbox');

  // save theme in DB
  try {
    await fetch(`/api/theme/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ theme })
    });
  } catch (err) {
    console.error('Error changing theme:', err);
  }
}

async function getTheme() {
  try {
    const res = await fetch('/api/theme', { credentials: 'include' });
    const theme = await res.json();
    applyTheme(theme || 'orange');
  } catch (err) {
    console.error('Error loading theme:', err);
  }
}

// =========================
// DARK MODE TOGGLE (localStorage)
// =========================
function setupDarkModeToggle() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const icon = darkModeToggle.querySelector('i');
  
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.body.removeAttribute('data-theme');
      icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    }
  });
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    icon.className = 'fas fa-sun';
  }
}

// =========================
// RENDER TASKS TO DOM
// =========================
function renderTasks(tasks) {
  const listContainer = document.getElementById('listContainer');
  listContainer.innerHTML = '';

  if (tasks.length === 0) {
    listContainer.innerHTML = `
      <p class="emptyList">
        <i class="fas fa-clipboard-list"></i>
        Your list is empty. Add a task to get started!
      </p>
    `;
    countList(0, 0);
    return;
  }

  const list = document.createElement('ul');
  listContainer.appendChild(list);

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.setAttribute('data-id', task._id);
    
    if (task.completed) {
      li.classList.add('completed');
    }

    const taskText = document.createElement('span');
    taskText.textContent = task.task;
    taskText.classList.add('task-text');

    const div = document.createElement('div');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.completed === true;
    check.classList.add('checkbox');

    check.addEventListener('change', async () => {
      li.classList.toggle('completed', check.checked);
      await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ completed: check.checked })
      });
      countList();
    });

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.classList.add('button');
    delBtn.addEventListener('click', () => deleteTask(task._id));

    div.appendChild(check);
    div.appendChild(taskText);
    div.appendChild(delBtn);
    li.appendChild(div);
    list.appendChild(li);
  });

  countList();
}

// =========================
// COUNT FUNCTION
// =========================
function countList() {
  const countContainer = document.getElementById('countContainer');
  const total = document.querySelectorAll('li').length;
  
  if (total === 0) {
    countContainer.textContent = '';
    return;
  }
  
  const completed = document.querySelectorAll('.checkbox:checked').length;
  countContainer.textContent = `${completed}/${total}`;
}

// =========================
// INITIALIZE APP
// =========================
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  getTheme();
  setupThemePicker();
  setupDarkModeToggle();
  
  document.getElementById('addTask').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
});
