import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from "./fetchimages";
import { markupGallery } from "./markupGallery";

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");

searchForm.searchQuery.value = "cat";


function imageSearch(event) {
    event.preventDefault();

    const query = event.target.searchQuery.value;

    gallery.innerHTML = "";

    fetchImages(query).then((galleryArray) => {
        if (galleryArray.length == 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again."); 
            return;
        }

        galleryArray.map((image) => {
            gallery.insertAdjacentHTML("beforeend", markupGallery(image))
        });
    })
    
}

searchForm.addEventListener("submit", imageSearch);