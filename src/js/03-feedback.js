import throttle from "lodash.throttle";

const form = document.querySelector('form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onFormSubmit);

function onInput(e) {
  const key = e.target.name;
  formData[key] = e.target.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(e) {
  e.preventDefault();

  if (email.value === '' || message.value === '') {
      return alert('Заповнені не всі поля!!!');
  };
  console.log(formData);
  formData = {}
  e.currentTarget.reset();

  localStorage.removeItem(LOCALSTORAGE_KEY);
};

function getLocalStorageData () {
  try {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!data) return
    formData = JSON.parse(data)
    Object.entries(([key, val]) => {
        form.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message)
  }
};

window.addEventListener('load',getLocalStorageData);