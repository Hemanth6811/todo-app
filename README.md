# 📋 My To-Do App

A clean, professional, card-based To-Do application built with pure **HTML**, **CSS**, and **JavaScript** — no frameworks, no libraries, just the basics done well.

---

## 🖼️ Preview

```
┌─────────────────────────────────────┐
│  🎨  My Tasks                       │
│      3 tasks remaining              │
│  [5 Total] [3 Active] [2 Done]      │
├─────────────────────────────────────┤
│  [ Add a new task...      ] [+ Add] │
│  ( All )  ( Active )  ( Done )      │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ○  Buy groceries      ✏️ 🗑️ │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ ✓  Read a book  ~~done~~ 🗑️│    │
│  └─────────────────────────────┘    │
│                                     │
│                  Clear Completed    │
└─────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|---|---|
| ➕ **Add Task** | Type a task and press **Enter** or click **+ Add** |
| ✅ **Complete Task** | Click the circle checkbox to mark done / undone |
| ✏️ **Edit Task** | Hover over a task and click the pencil icon to edit |
| 🗑️ **Delete Task** | Hover over a task and click the bin icon to delete |
| 🔍 **Filter Tasks** | Switch between **All**, **Active**, and **Done** views |
| 🧹 **Clear Completed** | Remove all finished tasks in one click |
| 💾 **Auto Save** | Tasks are saved to `localStorage` — they survive page refresh |
| 📊 **Live Stats** | Header shows Total / Active / Done count in real time |
| 📱 **Responsive** | Works on desktop, tablet, and mobile phones |

---

## 📁 File Structure

```
todo-app/
│
├── index.html      ← The structure (HTML skeleton)
├── style.css       ← The design (colors, layout, card)
├── script.js       ← The logic (add, delete, save tasks)
└── README.md       ← This file (you are here!)
```

> All 3 files must be in the **same folder** for the app to work.

---

## 🚀 How to Run

No installation needed. No server needed. Just:

1. Download all 3 files into the same folder
2. Double-click `index.html`
3. It opens in your browser — done! ✅

---

## 🛠️ How to Use

### Adding a Task
1. Click the input box at the top of the card
2. Type your task (up to 100 characters)
3. Press **Enter** or click **+ Add**

### Completing a Task
- Click the **circle** on the left of a task
- It turns green with a ✓ checkmark
- The task text gets a strikethrough line
- Click again to undo

### Editing a Task
1. Hover over the task — two buttons appear on the right
2. Click ✏️ (pencil)
3. The text becomes editable — type your changes
4. Press **Enter** to save, or **Escape** to cancel

### Deleting a Task
1. Hover over the task
2. Click 🗑️ (bin icon)
3. Task is removed immediately

### Filtering Tasks
Click the tabs below the input box:
- **All** — shows every task
- **Active** — shows only unfinished tasks
- **Done** — shows only completed tasks

### Clearing Completed Tasks
- Click **Clear Completed** at the bottom of the card
- All tasks marked as done are removed at once

---

## 💾 How Data is Saved

This app uses the browser's built-in **`localStorage`** to save your tasks.

```
You add a task  →  JavaScript saves it to localStorage
You refresh page →  JavaScript loads from localStorage
Your tasks are still there! ✅
```

**What this means:**
- ✅ Tasks survive page refresh
- ✅ Tasks survive closing and reopening the browser
- ❌ Tasks do NOT sync between different browsers or devices
- ❌ Tasks are lost if you clear your browser's storage/cache

---

## 🎨 Design Overview

| Part | Style |
|---|---|
| Page background | Dark navy (`#0F172A`) with a subtle grid pattern |
| Main card | Dark blue-gray (`#1E293B`) with a large drop shadow |
| Header | Indigo → purple gradient with frosted stat boxes |
| Task cards | Slightly lighter dark with hover glow effect |
| Accent color | Indigo (`#6366F1`) — buttons, focus rings, active tabs |
| Done color | Emerald green (`#10B981`) — checkbox and completed bg |
| Fonts | **Playfair Display** (title) + **Nunito** (body text) |

---

## 🧠 Concepts Used (Great for Learning!)

This app is great for beginners because it teaches:

**HTML**
- Semantic elements (`header`, `ul`, `li`, `button`, `input`)
- IDs and classes
- Linking CSS and JS files

**CSS**
- CSS Variables (`--color-name: value`)
- Flexbox (`display: flex`, `justify-content`, `align-items`)
- `flex: 1` to fill remaining space
- `:hover` and `:focus` states
- `::before` and `::after` pseudo-elements
- `@keyframes` animations
- `@media` queries for responsive design
- `opacity` vs `display: none`
- `border-radius` for rounded shapes
- `box-shadow` for depth and elevation
- `linear-gradient` for colorful backgrounds

**JavaScript**
- `document.getElementById()` to connect to HTML
- Arrays and objects
- `Array.push()`, `Array.filter()`
- `localStorage.setItem()` and `getItem()`
- `JSON.stringify()` and `JSON.parse()`
- `document.createElement()` and `appendChild()`
- Event listeners (`onclick`, `onkeydown`, `addEventListener`)
- Template logic (`if` / `else`, `for` loops)

---

## 🔧 Customization Tips

Want to change the look? Here's where to go in `style.css`:

### Change the main color
```css
/* In the :root section at the top of style.css */
:root {
  --accent: #6366F1;      /* ← change this to any color you like */
  --header-bg: #6366F1;   /* ← and this for the header */
}
```

### Change the fonts
```html
<!-- In index.html, swap out the Google Fonts link -->
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet" />
```

```css
/* Then in style.css update the font-family */
body { font-family: 'YourFont', sans-serif; }
```

### Change to a light theme
```css
:root {
  --page-bg:  #F1F5F9;   /* light gray page */
  --card-bg:  #FFFFFF;   /* white card */
  --task-bg:  #F8FAFC;   /* very light task cards */
  --text-primary: #1E293B; /* dark text */
}
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| App doesn't open | Make sure all 3 files are in the **same folder** |
| Styles not loading | Check `style.css` is spelled exactly right in `index.html` |
| JS not working | Open browser DevTools (`F12`) → Console tab for errors |
| Tasks not saving | Make sure your browser allows `localStorage` (not private mode) |
| Font not loading | Check your internet connection (fonts load from Google) |

---

## 📖 Learning Resources

Want to learn more about the technologies used?

- **HTML** → [MDN HTML Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- **CSS** → [MDN CSS Guide](https://developer.mozilla.org/en-US/docs/Learn/CSS)
- **JavaScript** → [MDN JS Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
- **Flexbox** → [CSS Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- **localStorage** → [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 📄 License

This project is free to use, modify, and share.
Built for learning purposes. No attribution required.

---

*Built with ❤️ using HTML, CSS & JavaScript — no frameworks needed!*
