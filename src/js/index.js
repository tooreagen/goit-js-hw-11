import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { click } from "./test";

const button = document.querySelector(".button");

button.addEventListener("click", click);

Notify.success("Йа загрузилсо");