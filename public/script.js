// =========================
// LOAD TASKS ON PAGE START
// =========================
async function loadTasks() {
  try {
    const res = await fetch('/api/tasks', {
      method: 'GET',
      credentials: 'include' // send session cookie
    });

    if (res.status === 401) {
      // not logged in → back to login page
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
   listContainer.innerHTML = ''; // clear old content
 
  if (tasks.length === 0)
  {
       listContainer.innerHTML = 'you list is empty'
    return;
  }

 

  const list = document.createElement('ul');
  list.textContent = '';
  listContainer.appendChild(list);

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.task; // use correct field from model
                const div = document.createElement("div");

    // delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.classList.add('button')
             const check = document.createElement("input");
                check.type = "checkbox";
                check.checked = task.completed === true;
                check.classList.add("checkbox");
                
                li.textContent = task.task;
                check.onchange = async () => {
                    await fetch(`/api/tasks/${task._id}`,
                        {
                            method: 'PUT',
                            headers: {'Content-Type': 'application/json'},
                             credentials: 'include',
          
                            body: JSON.stringify({completed: check.checked})
                        }
                    )
                }
                div.appendChild(check);
    delBtn.onclick = () => deleteTask(task._id);
     li.appendChild(div)
    div.appendChild(delBtn);
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
      body: JSON.stringify({ task: text }) // ✅ match schema
    });

    if (res.ok) {
      input.value = '';
      loadTasks(); // reload after adding
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
      loadTasks(); // reload after delete
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
// EVENT LISTENERS
// =========================
// document.getElementById('submitBtn').addEventListener('click', addTask);
// document.getElementById('logout').addEventListener('click', logout);

// Initial load
loadTasks();