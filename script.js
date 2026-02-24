/* ================================================================
   SCRIPT.JS — To-Do App Logic (Beginner Friendly)
   
   STEP BY STEP:
   1.  Connect to HTML elements
   2.  Set up data storage
   3.  Load saved tasks
   4.  Save tasks to storage
   5.  Render (draw) all tasks on screen
   6.  Build one task element
   7.  Add a new task
   8.  Delete a task
   9.  Toggle task done/undone
   10. Start editing a task
   11. Finish editing
   12. Filter tasks (All / Active / Done)
   13. Clear completed tasks
   14. Update the counter + stats
   15. Show/hide empty message
   16. Keyboard shortcut (Enter to add)
   17. Start the app!
================================================================ */


/* ================================================================
   STEP 1 — CONNECT TO HTML ELEMENTS
   ----------------------------------------------------------------
   getElementById('name') finds the HTML element with id="name"
   and returns it so JavaScript can read or change it.
================================================================ */

var taskInput   = document.getElementById('taskInput');    // text input box
var taskList    = document.getElementById('taskList');      // the <ul> list
var taskCounter = document.getElementById('taskCounter');   // "X tasks remaining"
var emptyState  = document.getElementById('emptyState');    // "No tasks" message

// Stat boxes in the header
var statTotal   = document.getElementById('statTotal');     // total count
var statActive  = document.getElementById('statActive');    // active count
var statDone    = document.getElementById('statDone');      // done count


/* ================================================================
   STEP 2 — SET UP DATA
   ----------------------------------------------------------------
   tasks = an array (list) of task objects.
   
   Each task object looks like:
   {
     id:   1700000000000,   ← unique number (timestamp)
     text: "Buy groceries", ← the task text
     done: false            ← is it completed?
   }
   
   currentFilter = which view is active: 'all', 'active', or 'done'
================================================================ */

var tasks         = [];       // starts as empty list
var currentFilter = 'all';    // show all tasks by default


/* ================================================================
   STEP 3 — LOAD SAVED TASKS FROM localStorage
   ----------------------------------------------------------------
   localStorage is a browser storage system.
   Data saved here SURVIVES page refresh and browser close.
   
   localStorage only stores STRINGS (text).
   JSON.parse() converts a string back into a JavaScript array/object.
================================================================ */

function loadTasksFromStorage() {
  var savedData = localStorage.getItem('myTodoTasks');
  if (savedData !== null) {
    tasks = JSON.parse(savedData);  // convert string → array
  }
}


/* ================================================================
   STEP 4 — SAVE TASKS TO localStorage
   ----------------------------------------------------------------
   We call this every time tasks change so nothing is lost.
   
   JSON.stringify() converts our array into a string for storage.
================================================================ */

function saveTasksToStorage() {
  localStorage.setItem('myTodoTasks', JSON.stringify(tasks));
}


/* ================================================================
   STEP 5 — RENDER ALL TASKS (draw them on screen)
   ----------------------------------------------------------------
   This clears the list and redraws all tasks from scratch.
   We call renderTasks() every time something changes.
   
   Simple approach: wipe everything, redraw.
   Not the most efficient but easy to understand!
================================================================ */

function renderTasks() {
  // Clear the list — remove all existing task items
  taskList.innerHTML = '';

  // Decide which tasks to show based on the active filter
  var tasksToShow = tasks.filter(function(task) {
    if (currentFilter === 'active') return task.done === false;
    if (currentFilter === 'done')   return task.done === true;
    return true;   // 'all' — show every task
  });

  // Loop through each task and add it to the list
  for (var i = 0; i < tasksToShow.length; i++) {
    var taskElement = createTaskElement(tasksToShow[i]);
    taskList.appendChild(taskElement);  // add to the <ul>
  }

  // Update all counters and the empty state message
  updateStats();
  toggleEmptyState(tasksToShow.length);
}


/* ================================================================
   STEP 6 — CREATE ONE TASK ELEMENT
   ----------------------------------------------------------------
   Builds the HTML for a single task and returns it.
   We use document.createElement() to build elements in JavaScript.
   
   Each task looks like:
   ┌─────────────────────────────────────┐
   │  ○  Buy groceries           ✏️  🗑️  │
   └─────────────────────────────────────┘
   checkbox  text               buttons
================================================================ */

function createTaskElement(task) {
  // Create the <li> element
  var li = document.createElement('li');
  li.className = 'task-item' + (task.done ? ' done' : '');
  li.setAttribute('data-id', task.id);

  // ── CHECKBOX (custom circle) ──
  var checkbox = document.createElement('div');
  checkbox.className = 'custom-checkbox';
  checkbox.onclick = function() {
    toggleDone(task.id);   // mark done/undone when clicked
  };

  // ── TASK TEXT ──
  var textSpan = document.createElement('span');
  textSpan.className = 'task-text';
  textSpan.textContent = task.text;

  // ── ACTION BUTTONS CONTAINER ──
  var actionsDiv = document.createElement('div');
  actionsDiv.className = 'task-actions';

  // Edit button
  var editBtn = document.createElement('button');
  editBtn.className = 'icon-btn edit-btn';
  editBtn.title = 'Edit this task';
  editBtn.innerHTML = '✏️';
  editBtn.onclick = function() {
    startEditing(task.id, li, textSpan);
  };

  // Delete button
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'icon-btn delete-btn';
  deleteBtn.title = 'Delete this task';
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.onclick = function() {
    deleteTask(task.id);
  };

  // Put buttons inside the actions container
  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  // Put everything inside the <li>
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(actionsDiv);

  return li;
}


/* ================================================================
   STEP 7 — ADD A NEW TASK
   ----------------------------------------------------------------
   Called when user clicks the "+ Add" button.
   
   .trim() removes spaces from the start and end of the text
   so a task of just "   " (spaces) won't be added.
================================================================ */

function addTask() {
  var text = taskInput.value.trim();   // get and clean the input text

  // Don't add if empty
  if (text === '') {
    taskInput.focus();   // put cursor back in the input box
    taskInput.style.borderColor = '#F87171';  // red border = error signal
    setTimeout(function() {
      taskInput.style.borderColor = '';       // remove red after 1 second
    }, 1000);
    return;   // stop the function
  }

  // Create a new task object
  var newTask = {
    id:   Date.now(),   // Date.now() returns a unique number (milliseconds since 1970)
    text: text,
    done: false
  };

  // Add to our tasks array
  tasks.push(newTask);

  // Save to localStorage and update the screen
  saveTasksToStorage();
  renderTasks();

  // Clear the input and focus it for the next task
  taskInput.value = '';
  taskInput.focus();
}


/* ================================================================
   STEP 8 — DELETE A TASK
   ----------------------------------------------------------------
   filter() keeps all tasks EXCEPT the one we want to delete.
================================================================ */

function deleteTask(taskId) {
  tasks = tasks.filter(function(task) {
    return task.id !== taskId;   // keep tasks whose id does NOT match
  });

  saveTasksToStorage();
  renderTasks();
}


/* ================================================================
   STEP 9 — TOGGLE DONE (Complete / Uncomplete)
   ----------------------------------------------------------------
   ! (exclamation mark) FLIPS a boolean:
   !true  = false
   !false = true
================================================================ */

function toggleDone(taskId) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i].done = !tasks[i].done;  // flip true→false or false→true
      break;  // stop looping once found
    }
  }

  saveTasksToStorage();
  renderTasks();
}


/* ================================================================
   STEP 10 — START EDITING A TASK
   ----------------------------------------------------------------
   Replaces the task text with a text input so user can type.
   
   li        = the <li> element of this task
   textSpan  = the <span> showing the task text
================================================================ */

function startEditing(taskId, li, textSpan) {
  var task = findTask(taskId);
  if (!task) return;   // safety check — stop if task not found

  // Create an input field pre-filled with the current text
  var editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = task.text;
  editInput.maxLength = 100;

  // Swap out the text span for the edit input
  li.replaceChild(editInput, textSpan);
  editInput.focus();
  editInput.select();   // select all text so user can type immediately

  // Save when user presses Enter
  editInput.onkeydown = function(e) {
    if (e.key === 'Enter')  finishEditing(taskId, editInput.value);
    if (e.key === 'Escape') renderTasks();   // cancel and restore
  };

  // Also save when user clicks away (loses focus)
  editInput.onblur = function() {
    finishEditing(taskId, editInput.value);
  };
}


/* ================================================================
   STEP 11 — FINISH EDITING
   ----------------------------------------------------------------
   Saves the new task text. If the text is empty, deletes the task.
================================================================ */

function finishEditing(taskId, newText) {
  newText = newText.trim();

  if (newText === '') {
    deleteTask(taskId);   // delete if user cleared the text
    return;
  }

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i].text = newText;
      break;
    }
  }

  saveTasksToStorage();
  renderTasks();
}


/* ================================================================
   STEP 12 — FILTER TASKS
   ----------------------------------------------------------------
   Called when user clicks All / Active / Done tabs.
================================================================ */

function filterTasks(filterName) {
  currentFilter = filterName;

  // Remove "active" class from all filter buttons
  var buttons = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }

  // Add "active" class to the clicked button
  document.getElementById('filter-' + filterName).classList.add('active');

  renderTasks();
}


/* ================================================================
   STEP 13 — CLEAR COMPLETED TASKS
   ----------------------------------------------------------------
   Removes all tasks where done === true.
================================================================ */

function clearCompleted() {
  tasks = tasks.filter(function(task) {
    return task.done === false;   // keep only unfinished tasks
  });

  saveTasksToStorage();
  renderTasks();
}


/* ================================================================
   STEP 14 — UPDATE STATS (counters + header boxes)
   ----------------------------------------------------------------
   Updates:
   - "X tasks remaining" text
   - Total / Active / Done numbers in the header boxes
================================================================ */

function updateStats() {
  var total  = tasks.length;
  var done   = tasks.filter(function(t) { return t.done === true; }).length;
  var active = total - done;

  // Update header stat boxes
  statTotal.textContent  = total;
  statActive.textContent = active;
  statDone.textContent   = done;

  // Update the subtitle counter
  var word = active === 1 ? 'task' : 'tasks';
  taskCounter.textContent = active + ' ' + word + ' remaining';
}


/* ================================================================
   STEP 15 — SHOW / HIDE EMPTY STATE MESSAGE
   ----------------------------------------------------------------
   If no tasks are visible, show the "No tasks" message.
   Otherwise, hide it.
================================================================ */

function toggleEmptyState(visibleCount) {
  if (visibleCount === 0) {
    emptyState.classList.add('visible');    // show
  } else {
    emptyState.classList.remove('visible'); // hide
  }
}


/* ================================================================
   HELPER — FIND A TASK BY ID
   ----------------------------------------------------------------
   Searches through tasks[] and returns the matching task.
================================================================ */

function findTask(taskId) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) return tasks[i];
  }
}


/* ================================================================
   STEP 16 — KEYBOARD SHORTCUT
   ----------------------------------------------------------------
   Press Enter while typing in the input → adds the task.
   No need to click the button!
================================================================ */

taskInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});


/* ================================================================
   STEP 17 — START THE APP
   ----------------------------------------------------------------
   When the page first loads:
   1. Load any tasks saved in localStorage
   2. Draw them on screen
================================================================ */

loadTasksFromStorage();
renderTasks();