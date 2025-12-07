document.addEventListener('DOMContentLoaded', () => 
    {
        const taskInput = document.getElementById('taskinput');
        const addTaskBtn = document.getElementById('add-task-btn');
        const tasklist = document.getElementById('task-list');
        const emptyImage = document.querySelector('.empty-image');
        const emptyMessage = document.querySelector('.empty-message');

        const updateEmptyState = () => {
            emptyImage.style.display = tasklist.children.length === 0 ? 'block' : 'none';
            emptyMessage.style.display = tasklist.children.length === 0 ? 'block' : 'none';
        }

        const addtask =(event) => {
            event.preventDefault();
            const taskText = taskInput.value.trim();
            if (!taskText) {
                return;
            }

            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox">
                <span class="task-text">${taskText}</span>
                <div class="task-buttons">
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            const checkbox = li.querySelector('.task-checkbox');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');

            deleteBtn.addEventListener('click', () => {
                li.remove();
                updateEmptyState();
            });

            checkbox.addEventListener('change', () => {
                const isChecked = checkbox.checked;
                li.classList.toggle('completed', isChecked);
                editBtn.disabled = isChecked;
                editBtn.style.opacity = isChecked ? 0.5 : 1;
                editBtn.style.cursor = isChecked ? 'not-allowed' : 'pointer';
            });

            editBtn.addEventListener('click', () => {
                if (!checkbox.checked) {
                    taskInput.value = li.querySelector('.task-text').textContent;
                    li.remove();
                    updateEmptyState();
                }
            });

            tasklist.appendChild(li);
            taskInput.value = '';
            updateEmptyState();
        };

        addTaskBtn.addEventListener('click', addtask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addtask(e);
            }
        });
    }
)

