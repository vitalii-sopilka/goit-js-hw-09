import { galleryItems } from './gallery-items.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryList = document.querySelector('.gallery');
 
const imageItem = galleryItems.map(({ preview, original, description }) => {
    return `<a class="gallery__link" href='${original}'>
    <img class='gallery__image'
    src='${preview}'
    data-source='${original}'
    alt='${description}'
    />
    </a>`
}).join("");

galleryList.insertAdjacentHTML("beforeend", imageItem);

new SimpleLightbox('.gallery a', {
captionsData: "alt",
});
