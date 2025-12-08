document.addEventListener('DOMContentLoaded', () => 
    {
        const taskInput = document.getElementById('taskinput');
        const dueInput = document.getElementById('dueinput');
        const addTaskBtn = document.getElementById('add-task-btn');
        const form = document.querySelector('.input-area');
        const tasklist = document.getElementById('task-list');
        const emptyImage = document.querySelector('.empty-image');
        const emptyMessage = document.querySelector('.empty-message');

        const updateEmptyState = () => {
            emptyImage.style.display = tasklist.children.length === 0 ? 'block' : 'none';
            emptyMessage.style.display = tasklist.children.length === 0 ? 'block' : 'none';
        }

        const saveTaskToLocalStorage = () => {
            const tasks = Array.from(tasklist.querySelectorAll('li.task-item')).map(li => ({
                text: li.querySelector('.task-text')?.textContent || '',
                dueDate: li.dataset.dueDate || '',
                completed: !!li.querySelector('.task-checkbox')?.checked
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }


        const addTask = (taskText, dueDate, completed = false, save = true) => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            li.dataset.dueDate = dueDate || '';
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
                <span class="task-text">${taskText}</span>
                <span class="task-due" title="Due date">${dueDate || ''}</span>
                <div class="task-buttons">
                    <button class="edit-btn" aria-label="Edit task"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn" aria-label="Delete task"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            const checkbox = li.querySelector('.task-checkbox');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');

            deleteBtn.addEventListener('click', () => {
                li.remove();
                updateEmptyState();
                saveTaskToLocalStorage();
                renderTasks(getTasksFromLocalStorage());
            });

            checkbox.addEventListener('change', () => {
                const isChecked = checkbox.checked;
                li.classList.toggle('completed', isChecked);
                editBtn.disabled = isChecked;
                editBtn.style.opacity = isChecked ? 0.5 : 1;
                editBtn.style.cursor = isChecked ? 'not-allowed' : 'pointer';
                saveTaskToLocalStorage();
                renderTasks(getTasksFromLocalStorage());
            });

            editBtn.addEventListener('click', () => {
                if (!checkbox.checked) {
                    taskInput.value = li.querySelector('.task-text').textContent;
                    if (dueInput) dueInput.value = li.dataset.dueDate || '';
                    li.remove();
                    updateEmptyState();
                    saveTaskToLocalStorage();
                    renderTasks(getTasksFromLocalStorage());
                }
            });

            if (completed) {
                li.classList.add('completed');
                editBtn.disabled = true;
                editBtn.style.opacity = 0.5;
                editBtn.style.cursor = 'not-allowed';
            }

            tasklist.appendChild(li);
            updateEmptyState();
            if (save) saveTaskToLocalStorage();
        };

        const getTasksFromLocalStorage = () => JSON.parse(localStorage.getItem('tasks')) || [];

        const renderTasks = (tasks) => {
            tasklist.innerHTML = '';
            if (!tasks.length) {
                updateEmptyState();
                return;
            }
            const groups = tasks.reduce((acc, t) => {
                const key = t.dueDate || '';
                if (!acc[key]) acc[key] = [];
                acc[key].push(t);
                return acc;
            }, {});
            const dates = Object.keys(groups).sort();
            dates.forEach(dateStr => {
                const header = document.createElement('li');
                header.className = 'group-header';
                const d = dateStr ? new Date(dateStr + 'T00:00:00') : null;
                const label = d && !isNaN(d) ? d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : dateStr;
                header.textContent = label;
                tasklist.appendChild(header);
                groups[dateStr].forEach(({text, dueDate, completed}) => addTask(text, dueDate, completed, false));
            });
            updateEmptyState();
        };

        const loadTasksFromLocalStorage = () => {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const hasDue = savedTasks.every(t => Object.prototype.hasOwnProperty.call(t, 'dueDate'));
            let tasksToLoad = savedTasks;
            if (!hasDue && savedTasks.length) {
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const dd = String(today.getDate()).padStart(2, '0');
                const todayStr = `${yyyy}-${mm}-${dd}`;
                tasksToLoad = savedTasks.map(t => ({ ...t, dueDate: todayStr }));
                localStorage.setItem('tasks', JSON.stringify(tasksToLoad));
            }
            renderTasks(tasksToLoad);
        }

        loadTasksFromLocalStorage();

        const addtask = (event) => {
            event.preventDefault();
            const taskText = taskInput.value.trim();
            const dueDate = dueInput ? dueInput.value : '';
            if (!taskText) return;
            if (dueInput && !dueDate) {
                dueInput.focus();
                if (typeof dueInput.reportValidity === 'function') {
                    dueInput.reportValidity();
                }
                return;
            }
            addTask(taskText, dueDate);
            taskInput.value = '';
            if (dueInput) dueInput.value = '';
            saveTaskToLocalStorage();
            renderTasks(getTasksFromLocalStorage());
        };

        addTaskBtn.addEventListener('click', addtask);
        if (form) {
            form.addEventListener('submit', addtask);
        }
        
    }
)

