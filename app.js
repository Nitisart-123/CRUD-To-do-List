const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const editBtn = document.querySelector(".edit-btn");
let todos = [];
loadTodos();
renderTodos();

// ฟังก์ชันโหลด Todo จาก localStorage
function loadTodos() {
    const stored = localStorage.getItem("todos");
    if (stored) {
        todos = JSON.parse(stored);
    }
}

// ฟังก์ชันบันทึก Todo ลง localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos)); // แปลง array เป็น string
}

// แสดงรายการ Todo
function renderTodos() {
    todoList.innerHTML = ""; // เคลียร์รายการเก่า

    todos.forEach(todo => {
        todoList.innerHTML += `
            <li>
                <div>
                    <input type="checkbox" data-id="${todo.id}" onChange="checkBox(this)" ${todo.completed ? "checked" : ""}/>
                    <p  style="text-decoration: ${todo.completed ? 'line-through' : 'none'};">${todo.text}</p>
                </div>
                <div>
                    <button class="edit-btn" data-id="${todo.id}" onclick="editTodoUI(this)">แก้ไข</button>
                    <button class="delete-btn" data-id="${todo.id}" onclick="deleteTodoUI(this)">ลบ</button>
                </div>
            </li>
        `;
    });
}


// เพิ่ม Todo
let addBtn = () => {
    if (todoInput.value.trim() === "") {
        alert("กรุณากรอกข้อมูล Todo");
        return;
    }

    const newTodo = {
        id: Date.now(), // สร้าง id จากเวลา
        text: todoInput.value,
        completed: false
    };

    todos.push(newTodo);
    saveTodos(); // บันทึกลง localStorage
    renderTodos(); // แสดงผลใหม่
    todoInput.value = ""; // เคลียร์ช่องกรอก
}

// หน้าแก้ไข Todo
let editTodoUI = (element) => {
    // เข้าถึง dataset id ของปุ่มแก้ไข
    const id = element.dataset.id;

    const editUI = document.querySelector(".edit-ui");
    const editInput = document.getElementById("edit-input");
    editUI.style.display = "flex"; // แสดงหน้าแก้ไข
    const todo = todos.find(t => t.id == id);
    editInput.value = todo.text; // แสดงข้อความในช่องกรอก

    // เพิ่ม data-id ให้กับปุ่มยืนยันการแก้ไข
    const confirmEditBtn = document.querySelector(".confirm-edit-btn");
    confirmEditBtn.dataset.id = id;
}

// ยืนยันการแก้ไข Todo
let confirmEdit = (element) => {
    const id = element.dataset.id;
    const todo = todos.find(t => t.id == id);
    const editInput = document.getElementById("edit-input");
    todo.text = editInput.value; // แก้ไขข้อความ
    saveTodos(); // บันทึกลง localStorage
    renderTodos(); // แสดงผลใหม่
    editInput.value = ""; // เคลียร์ช่องกรอก

    const editUI = document.querySelector(".edit-ui");
    editUI.style.display = "none"; // ซ่อนหน้าแก้ไข
}

// ยกเลิกการแก้ไข Todo
let cancelEdit = () => {
    const editUI = document.querySelector(".edit-ui");
    const editInput = document.getElementById("edit-input");
    editUI.style.display = "none"; // ซ่อนหน้าแก้ไข
    editInput.value = ""; // เคลียร์ช่องกรอก

}

// หน้าลบ Todo
let deleteTodoUI = (element) => {
    // เข้าถึง dataset id ของปุ่มลบ
    const id = element.dataset.id;

    const deleteUI = document.querySelector(".delete-ui");
    deleteUI.style.display = "flex"; // แสดงหน้าเตือนลบ

    // เพิ่ม data-id ให้กับปุ่มยืนยันการลบ
    const confirmDeleteBtn = document.querySelector(".confirm-delete-btn");
    confirmDeleteBtn.dataset.id = id;
}   

// ยืนยันการลบ Todo
let confirmDelete = (element) => {
    const id = element.dataset.id;
    todos = todos.filter(t => t.id != id); // ลบ Todo ที่เลือก
    saveTodos(); // บันทึกลง localStorage
    renderTodos(); // แสดงผลใหม่

    const deleteUI = document.querySelector(".delete-ui");
    deleteUI.style.display = "none"; // ซ่อนหน้าเตือนลบ
}

// ยกเลิกการลบ Todo
let cancelDelete = () => {
    const deleteUI = document.querySelector(".delete-ui");
    deleteUI.style.display = "none"; // ซ่อนหน้าเตือนลบ
}

let checkBox = (element) => {   
    const todoId = element.dataset.id;
    const todo = todos.find(t => t.id == todoId);
    todo.completed = element.checked; // เปลี่ยนสถานะ completed
    saveTodos(); // บันทึกลง localStorage
    renderTodos(); // แสดงผลใหม่
}


