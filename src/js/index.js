import '../css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import { fetchImages } from "./fetchimages";
import { markupGallery } from "./markupGallery";

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");
let page = 1;
let totalPages = 40;
let query = "";

searchForm.searchQuery.value = "пелая";


function imageSearch(event) {
    event.preventDefault();
    query = event.target.searchQuery.value;
    
    loadMoreButton.classList.add("hide");
    gallery.innerHTML = "";
    page = 1;
    totalPages = 40;

    fetchImages(query, page).then((galleryArray) => {
        if (galleryArray.hits.length == 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again."); 
            return;
        }
        galleryArray.hits.map((image) => {
            gallery.insertAdjacentHTML("beforeend", markupGallery(image));
        });
        SimpleLightbox.refresh();
        Notify.success(`Hooray! We found ${galleryArray.totalHits} images.`);
        page += 1;
        loadMoreButton.classList.remove("hide");
    })
}

function imagePagination() {
    fetchImages(query, page).then((galleryArray) => {
        if (totalPages >= galleryArray.totalHits) {
            Notify.failure("We're sorry, but you've reached the end of search results.");
            return;
        }

        galleryArray.hits.map((image) => {
            gallery.insertAdjacentHTML("beforeend", markupGallery(image));
        });
        SimpleLightbox.refresh();
        page += 1;
        totalPages += 40;
    });
}

searchForm.addEventListener("submit", imageSearch);
loadMoreButton.addEventListener("click", imagePagination);