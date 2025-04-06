"use strict";

let lists = {
    "Pilne": [],
};

let trash = [];
let taskToDelete = null;
let modalInstance = null;
let taskToDeleteList = null;
let listToDelete = null;

function updateListSelector() {
    const selector = document.getElementById("listSelector");
    selector.innerHTML = "";
    for (const name of Object.keys(lists)) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        selector.appendChild(option);
    }
}

function addTask() {
    const input = document.getElementById("taskInput");
    const listName = document.getElementById("listSelector").value;
    const value = input.value.trim();
    if (value === "") {
        return;
    }
    const task = {
        id: Date.now(),
        text: value,
        completed: false,
        completedDate: null
    };

    lists[listName].push(task);
    input.value = "";
    renderAllLists();
}

function renderAllLists() {
    const container = document.getElementById("listsContainer");
    container.innerHTML = "";

    for (const [listName, tasks] of Object.entries(lists)) {
        const section = document.createElement("div");

        const headerWrapper = document.createElement("div");
        headerWrapper.className = "d-flex justify-content-between align-items-center list-header";

        const header = document.createElement("h3");
        header.textContent = listName;
        header.style.cursor = "pointer";

        const deleteListBtn = document.createElement("button");
        deleteListBtn.textContent = "Usuń listę";
        deleteListBtn.className = "btn btn-sm btn-outline-danger";
        deleteListBtn.onclick = (e) => {
            e.stopPropagation();
            listToDelete = listName;
            document.getElementById("modalText").textContent = `Czy na pewno chcesz usunąć całą listę: "${listName}"?`;
            const modalEl = document.getElementById("deleteModal");
            modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
            modalInstance.show();
        };

        header.onclick = () => {
            taskList.classList.toggle("d-none");
        };

        headerWrapper.appendChild(header);
        headerWrapper.appendChild(deleteListBtn);

        const taskList = document.createElement("ul");
        taskList.className = "list-group mt-2";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add("completed", "list-group-item-danger");
                li.textContent += ` (Wykonano: ${task.completedDate})`;
            }

            li.onclick = () => toggleComplete(task.id, listName);

            const delBtn = document.createElement("button");
            delBtn.textContent = "X";
            delBtn.className = "btn btn-sm btn-outline-danger ms-2";
            delBtn.onclick = (e) => {
                e.stopPropagation();
                showModal(task, listName);
            };

            li.appendChild(delBtn);
            taskList.appendChild(li);
        });

        section.appendChild(headerWrapper);
        section.appendChild(taskList);
        container.appendChild(section);
    }
}

function toggleComplete(id, listName) {
    const task = lists[listName].find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    task.completedDate = task.completed ? new Date().toLocaleString() : null;
    renderAllLists();
}

function showModal(task, listName) {
    taskToDelete = task;
    taskToDeleteList = listName;
    listToDelete = null;
    document.getElementById("modalText").textContent = `Czy na pewno chcesz usunąć: "${task.text}"?`;
    const modalEl = document.getElementById("deleteModal");
    modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
}

function closeModal() {
    if (modalInstance) {
        modalInstance.hide();
    }
    taskToDelete = null;
    taskToDeleteList = null;
    listToDelete = null;
}

function confirmDelete() {
    if (listToDelete) {
        delete lists[listToDelete];
        updateListSelector();
    } else if (taskToDelete && taskToDeleteList) {
        lists[taskToDeleteList] = lists[taskToDeleteList].filter(t => t.id !== taskToDelete.id);
        trash.push({ ...taskToDelete, list: taskToDeleteList });
    }
    closeModal();
    renderAllLists();
}

function undoDelete() {
    if (trash.length > 0) {
        const lastDeleted = trash.pop();
        if (!lists[lastDeleted.list]) lists[lastDeleted.list] = [];
        lists[lastDeleted.list].push(lastDeleted);
        renderAllLists();
    }
}

document.getElementById("addListForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newListName = document.getElementById("newListName").value.trim();
    if (newListName && !lists[newListName]) {
        lists[newListName] = [];
        updateListSelector();
        renderAllLists();
        document.getElementById("newListName").value = "";
    }
});

document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z" && trash.length > 0) {
        undoDelete();
    }
});

function searchTasks() {
    const query = document.getElementById("searchInput").value;
    const caseSensitive = document.getElementById("caseSensitive").checked;

    const container = document.getElementById("listsContainer");
    container.innerHTML = "";

    for (const [listName, tasks] of Object.entries(lists)) {
        const filtered = tasks.filter(task => {
            const text = caseSensitive ? task.text : task.text.toLowerCase();
            const search = caseSensitive ? query : query.toLowerCase();
            return text.includes(search);
        });

        if (filtered.length === 0) continue;

        const section = document.createElement("div");

        const headerWrapper = document.createElement("div");
        headerWrapper.className = "d-flex justify-content-between align-items-center list-header";

        const header = document.createElement("h3");
        header.textContent = listName;
        header.style.cursor = "pointer";

        const taskList = document.createElement("ul");
        taskList.className = "list-group mt-2";

        filtered.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add("completed", "list-group-item-danger");
                li.textContent += ` (Wykonano: ${task.completedDate})`;
            }
            li.onclick = () => toggleComplete(task.id, listName);

            const delBtn = document.createElement("button");
            delBtn.textContent = "X";
            delBtn.className = "btn btn-sm btn-outline-danger ms-2";
            delBtn.onclick = (e) => {
                e.stopPropagation();
                showModal(task, listName);
            };

            li.appendChild(delBtn);
            taskList.appendChild(li);
        });

        header.onclick = () => {
            taskList.classList.toggle("d-none");
        };

        headerWrapper.appendChild(header);
        section.appendChild(headerWrapper);
        section.appendChild(taskList);
        container.appendChild(section);
    }
}

updateListSelector();
renderAllLists();
