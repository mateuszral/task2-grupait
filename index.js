const form = document.querySelector('.form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const priorityInput = document.querySelector('#priority');
const categoryInput = document.querySelector('#category');
const submitButton = document.querySelector('.submit__button');

const wrapper = document.querySelector('.wrapper');
const tableBody = document.querySelector('.wrapper__table tbody');

const inputs = document.querySelectorAll('input');

let isInputValid = {
  title: false,
  author: false,
  priority: false,
};

const inputPatterns = {
  title: /^[a-zA-Z1-9 ]+/,
  author: /^[a-zA-Z]{3,}/,
  priority: /[1-5]/,
};

const validate = (field, pattern) => {
  const valid = pattern.test(field.value);

  if (valid) {
    isInputValid[field.attributes.id.value] = true;
    field.classList.add('valid');
    field.classList.remove('invalid');
  } else {
    isInputValid[field.attributes.id.value] = false;
    field.classList.remove('valid');
    field.classList.add('invalid');
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, inputPatterns[e.target.attributes.id.value]);
  });
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (Object.values(isInputValid).every((item) => item)) {
    wrapper.classList.remove('hidden');

    const rowElement = document.createElement('tr');
    const titleElement = document.createElement('td');
    const authorElement = document.createElement('td');
    const priorityElement = document.createElement('td');
    const categoryElement = document.createElement('td');

    titleElement.innerText = titleInput.value;
    authorElement.innerText = authorInput.value;
    priorityElement.innerText = priorityInput.value;
    categoryElement.innerText = categoryInput.value;

    titleElement.dataset.label = 'Title';
    authorElement.dataset.label = 'Author';
    priorityElement.dataset.label = 'Priority';
    categoryElement.dataset.label = 'Category';

    titleInput.value = '';
    authorInput.value = '';
    priorityInput.value = '';
    categoryInput.value = 'Fantasy';

    rowElement.append(titleElement, authorElement, priorityElement, categoryElement);
    tableBody.append(rowElement);

    localStorage.setItem('books', tableBody.innerHTML);

    inputs.forEach((input) => {
      input.classList.remove('valid');
    });

    for (const [key] of Object.entries(isInputValid)) {
      isInputValid[key] = false
    }
  } else {
    inputs.forEach((input) => {
      if (!input.classList.contains('valid')) {
        input.classList.add('invalid');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const books = localStorage.getItem('books');

  if (books) {
    tableBody.innerHTML = books;
    wrapper.classList.remove('hidden');
  }
});
