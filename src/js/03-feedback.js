import throttle from "lodash.throttle";

const form = document.querySelector('form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onFormSubmit);

function onInput(e) {
    const key = e.target.name;
    formData[key] = e.target.value;

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData);

if (email.value === '' || message.value === '') {
    return alert('Заповнені не всі поля!!!');
    };

    e.currentTarget.reset();

    localStorage.removeItem(LOCALSTORAGE_KEY);
};

function getLocalStorageData () {
    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    if (data) {
        data.email ? email.value = data.email : "";
        data.message ? message.value = data.message: "";
    }
};

getLocalStorageData();