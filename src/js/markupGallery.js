export function markupGallery(image) {
    return `<div class="photo-card">
            <img src=${image.webformatURL} alt="${image.tags}" loading="lazy" height=200 />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${image.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${image.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${image.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${image.downloads}
                </p>
            </div>
            </div>`;
}

// largeImageURL - ссылка на большое изображение.