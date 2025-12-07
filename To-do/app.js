document.addEventListener('DOMContentLoaded', () => 
    {
        const taskInput = document.getElementById('taskinput');
        const addTaskBtn = document.getElementById('add-task-btn');
        const tasklist = document.getElementById('task-list');
        const emptyImage = document.getElementById('empty-image');
        const emptyMessage = document.getElementById('empty-message');

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
            li.textContent = taskText;
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

