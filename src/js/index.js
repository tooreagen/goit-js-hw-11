import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from "./fetchimages";
import { markupGallery } from "./markupGallery";

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");
let page = 1;
let totalPages = 5;
let query = "";

searchForm.searchQuery.value = "вишни спелая";


function imageSearch(event) {
    event.preventDefault();
    query = event.target.searchQuery.value;
    
    loadMoreButton.classList.add("hide");
    gallery.innerHTML = "";
    page = 1;
    let totalPages = 5;

    fetchImages(query, page).then((galleryArray) => {
        if (galleryArray.hits.length == 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again."); 
            return;
        }
        galleryArray.hits.map((image) => {
           // gallery.insertAdjacentHTML("beforeend", markupGallery(image))
        });
        page += 1;
        loadMoreButton.classList.remove("hide");
        console.log(galleryArray.totalHits);
        console.log("totalPages=",totalPages);
    })
}

function imagePagination() {
    fetchImages(query, page).then((galleryArray) => {
        if (totalPages >= galleryArray.totalHits) {
            console.log("ОТЛАДКА galleryArray.totalHits = ",galleryArray.totalHits);
            console.log("ОТЛАДКА totalPages = ",totalPages);
            Notify.failure("We're sorry, but you've reached the end of search results.");
            return;
        }

        galleryArray.hits.map((image) => {
          //  gallery.insertAdjacentHTML("beforeend", markupGallery(image))
        });
        page += 1;
        totalPages += 5;
        console.log(galleryArray.totalHits);
        console.log("totalPages=",totalPages);
    });
}

searchForm.addEventListener("submit", imageSearch);
loadMoreButton.addEventListener("click", imagePagination);