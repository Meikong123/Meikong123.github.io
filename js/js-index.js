let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slidesPerView = 4;

function showSlide() {
    const totalSlides = slides.length;

    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    const offset = -slideIndex * (100 / slidesPerView);
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    slideIndex--;
    showSlide();
}

function nextSlide() {
    slideIndex++;
    showSlide();
}

showSlide();

const announcementItems = document.querySelectorAll('.announcement-item');
const itemsPerPage = 8;
let currentPage = 0;

function showPage(page) {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    announcementItems.forEach((item) => {
        item.style.display = 'none';
        item.style.opacity = 0;
    });

    for (let i = startIndex; i < endIndex && i < announcementItems.length; i++) {
        announcementItems[i].style.display = 'flex';
        setTimeout(() => {
            announcementItems[i].style.opacity = 1;
        }, 50);
    }

    for (let i = endIndex; i < startIndex + itemsPerPage; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.classList.add('announcement-item');
        emptyItem.style.display = 'flex';
        emptyItem.style.opacity = 1;
        document.getElementById('announcement-board').appendChild(emptyItem);
    }

    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    prevPageButton.disabled = page === 0;
    nextPageButton.disabled = endIndex >= announcementItems.length;

    const pageNumbersContainer = document.getElementById('page-numbers');
    pageNumbersContainer.innerHTML = '';
    const totalPages = Math.ceil(announcementItems.length / itemsPerPage);
    for (let i = 0; i < totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.textContent = i + 1;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
        });
        if (i === page) {
            pageNumber.classList.add('active');
        }
        pageNumbersContainer.appendChild(pageNumber);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

function nextPage() {
    const totalPages = Math.ceil(announcementItems.length / itemsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

showPage(currentPage);

const thoughtItems = document.querySelectorAll('#thought-board .announcement-item');
const thoughtItemsPerPage = 8;
let thoughtCurrentPage = 0;

function showThoughtPage(page) {
    const startIndex = page * thoughtItemsPerPage;
    const endIndex = startIndex + thoughtItemsPerPage;

    thoughtItems.forEach((item) => {
        item.style.display = 'none';
        item.style.opacity = 0;
    });

    for (let i = startIndex; i < endIndex && i < thoughtItems.length; i++) {
        thoughtItems[i].style.display = 'flex';
        setTimeout(() => {
            thoughtItems[i].style.opacity = 1;
        }, 50);
    }

    for (let i = endIndex; i < startIndex + thoughtItemsPerPage; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.classList.add('announcement-item');
        emptyItem.style.display = 'flex';
        emptyItem.style.opacity = 1;
        document.getElementById('thought-board').appendChild(emptyItem);
    }

    const prevPageButton = document.getElementById('thought-prev-page');
    const nextPageButton = document.getElementById('thought-next-page');

    prevPageButton.disabled = page === 0;
    nextPageButton.disabled = endIndex >= thoughtItems.length;

    const pageNumbersContainer = document.getElementById('thought-page-numbers');
    pageNumbersContainer.innerHTML = '';
    const totalPages = Math.ceil(thoughtItems.length / thoughtItemsPerPage);
    for (let i = 0; i < totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.textContent = i + 1;
        pageNumber.addEventListener('click', () => {
            thoughtCurrentPage = i;
            showThoughtPage(thoughtCurrentPage);
        });
        if (i === page) {
            pageNumber.classList.add('active');
        }
        pageNumbersContainer.appendChild(pageNumber);
    }
}

function thoughtPrevPage() {
    if (thoughtCurrentPage > 0) {
        thoughtCurrentPage--;
        showThoughtPage(thoughtCurrentPage);
    }
}

function thoughtNextPage() {
    const totalPages = Math.ceil(thoughtItems.length / thoughtItemsPerPage);
    if (thoughtCurrentPage < totalPages - 1) {
        thoughtCurrentPage++;
        showThoughtPage(thoughtCurrentPage);
    }
}

showThoughtPage(thoughtCurrentPage);

