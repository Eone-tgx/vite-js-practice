import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  input: document.querySelector('.input-js'),
  addTodoBtn: document.querySelector('.btn-add'),
  todoList: document.querySelector('.todo-list'),
  todoListItem: document.querySelector('.todo-list-item'),
};

const LOCALE_STORAGE_KEY = 'todos-collection';

const editBtn = '<button type="button" class="btn-update">edit</button>';
const deleteBtn = '<button type="button" class="btn-delete">del</button>';

const todos = [];

function createTodo() {
  const todo = {
    id: Date.now(),
    status: 'todo-list-item',
    text: refs.input.value,
  };
  return todo;
}

function createMarkup({ id, status, text }) {
  const currentBtn = status === 'todo-list-item' ? editBtn : deleteBtn;

  return `<li id="${id}" class="${status}"><p>${text}</p>${currentBtn}</li>`;
}

function initPage() {
  const oldTodos = JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY)) || [];

  todos.push(...oldTodos);

  const markup = todos.map(createMarkup).join('');
  refs.todoList.innerHTML = markup;
}

initPage();

function addTodo() {
  const todoItem = createTodo();
  const markup = createMarkup(todoItem);

  if (!refs.input.value.trim()) {
    iziToast.error({
      title: 'Error',
      message: 'Please text todo name',
      position: 'topRight',
      timeout: 3000,
    });

    return;
  }

  refs.todoList.insertAdjacentHTML('beforeend', markup);

  iziToast.success({
    title: 'Success',
    message: 'Todo successfully added',
    position: 'topRight',
    timeout: 2000,
  });

  todos.push(todoItem);

  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(todos));

  refs.input.value = '';
}

function changeStatus(e) {
  if (e.target.nodeName !== 'LI') return;

  if (e.target.classList.contains('todo-list-item')) {
    e.target.classList.replace('todo-list-item', 'todo-list-item-done');
    e.target.lastElementChild.remove();
    e.target.insertAdjacentHTML('beforeend', deleteBtn);
  } else {
    e.target.classList.replace('todo-list-item-done', 'todo-list-item');
    e.target.lastElementChild.remove();
    e.target.insertAdjacentHTML('beforeend', editBtn);
  }

  saveStatusToLS(e.target);
}

function saveStatusToLS(el) {
  const data = JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY));

  const newStatus = data.map(todo => {
    if (todo.id === +el.id) {
      todo.status = el.classList[0];
    }
    return todo;
  });

  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(newStatus));
}

function openModal(e) {
  if (!e.target.classList.contains('btn-update')) return;
  const instance = basicLightbox.create(
    `
  <div class="modal-container">
    <button type="button" class="btn-close-modal">×</button>
    <input type="text" class="input-modal"  />
    <button
      type="button"
      class="btn-update-modal"
      id="${e.target.parentNode.id}"
    >
      Update todo
    </button>
  </div>
  `,
    {
      closable: true,
    }
  );
  instance.show(() => {
    document.querySelector('.input-modal').focus();
  });

  const closeModalBtn = document.querySelector('.btn-close-modal');
  const modalInput = document.querySelector('.input-modal');
  const modalUpdateBtn = document.querySelector('.btn-update-modal');

  modalUpdateBtn.addEventListener('click', e => {
    if (!modalInput.value.trim()) {
      iziToast.error({
        title: 'Error',
        message: 'Please text todo name',
        position: 'topRight',
        timeout: 3000,
      });
      return;
    }

    [...refs.todoList.children].forEach(todo => {
      if (e.target.id === todo.id) {
        todo.firstElementChild.textContent = modalInput.value;
      }
    });

    const data = JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY));

    const newText = data.map(todo => {
      if (todo.id === +e.target.id) {
        todo.text = modalInput.value;
      }
      return todo;
    });

    localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(newText));

    instance.close();
  });
}

function deleteTodo(e) {
  if (!e.target.classList.contains('btn-delete')) return;
  e.target.parentNode.remove();
  deleteTodoFromLS(e.target.parentNode);
}

function deleteTodoFromLS(el) {
  const data = JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY));

  const updatedTodos = data.filter(todo => todo.id !== +el.id);

  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(updatedTodos));
}

refs.addTodoBtn.addEventListener('click', addTodo);
refs.todoList.addEventListener('click', changeStatus);
refs.todoList.addEventListener('click', openModal);
refs.todoList.addEventListener('click', deleteTodo);
