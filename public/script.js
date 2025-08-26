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
// RENDER TASKS TO DOM
// =========================
function renderTasks(tasks) {
  const listContainer = document.getElementById('listContainer');
  listContainer.innerHTML = '';

  if (tasks.length === 0) {
    listContainer.innerHTML = '<p class="emptyList">Your list is empty ✨</p>';
    return;
  }

  const list = document.createElement('ul');
  listContainer.appendChild(list);

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.task;
    const div = document.createElement("div");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.completed === true;
    check.classList.add("checkbox");
    check.onchange = async () => {
      await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ completed: check.checked })
      });
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.classList.add('button');
    delBtn.onclick = () => deleteTask(task._id);

    div.appendChild(check);
    div.appendChild(delBtn);
    li.appendChild(div);
    list.appendChild(li);
  });
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
const themes = ["orange", "purple", "blue", "red", "green"];

async function applyTheme(theme) {
  const body = document.body;
  const h1 = document.getElementById("h1");
  const submitBtn = document.getElementById("submitBtn");
  const logoutImg = document.querySelector("#logout img");
  const addImg = document.querySelector("#submitBtn img");
  const checkBoxes = document.querySelectorAll(".checkbox");

  // reset old theme classes
  themes.forEach(t => {
    body.classList.remove(`bg-${t}`, `text-${t}`);
    h1?.classList.remove(`text-${t}`);
    submitBtn?.classList.remove(`btn-${t}`);
    logoutImg?.classList.remove(`img-${t}`);
    addImg?.classList.remove(`img-${t}`);
    checkBoxes.forEach(cb => cb.classList.remove(`acc-${t}`));
  });

  // apply new theme
  body.classList.add(`bg-${theme}`, `text-${theme}`);
  h1?.classList.add(`text-${theme}`);
  submitBtn?.classList.add(`btn-${theme}`);
  logoutImg?.classList.add(`img-${theme}`);
  addImg?.classList.add(`img-${theme}`);
  checkBoxes.forEach(cb => cb.classList.add(`acc-${theme}`));

  // save choice


  try {
    const setTheme = await fetch(`/api/theme/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ theme })
    });




  } catch (err) {
    console.error('Error changing theme:', err);
  }

}

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {

  loadTasks();

  getTheme()
});

async function getTheme() {
  const data = await fetch('/api/theme', { credentials: 'include' })

  const theme = await data.json();

  applyTheme(theme || 'orange');



}

