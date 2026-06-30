const announcementBoard = document.getElementById('announcement-board');
const announcementItems = Array.from(document.querySelectorAll('#announcement-board .announcement-item'));
const itemsPerPage = 9;
const pinnedAnnouncementItems = announcementItems.filter((item) => item.classList.contains('is-pinned'));
const regularAnnouncementItems = announcementItems.filter((item) => !item.classList.contains('is-pinned'));
let currentPage = 0;

function showPage(page) {
    if (!announcementBoard) {
        return;
    }

    const regularItemsPerPage = Math.max(itemsPerPage - pinnedAnnouncementItems.length, 1);
    const startIndex = page * regularItemsPerPage;
    const endIndex = startIndex + regularItemsPerPage;

    announcementBoard.querySelectorAll('.empty-item').forEach((item) => item.remove());

    announcementItems.forEach((item) => {
        item.style.display = 'none';
        item.style.opacity = 0;
    });

    pinnedAnnouncementItems.forEach((item, index) => {
        item.style.display = 'flex';
        setTimeout(() => {
            item.style.opacity = 1;
        }, 50 + index * 20);
    });

    for (let i = startIndex; i < endIndex && i < regularAnnouncementItems.length; i++) {
        regularAnnouncementItems[i].style.display = 'flex';
        setTimeout(() => {
            regularAnnouncementItems[i].style.opacity = 1;
        }, 50);
    }

    for (let i = endIndex; i < startIndex + regularItemsPerPage; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.classList.add('announcement-item');
        emptyItem.classList.add('empty-item');
        emptyItem.style.display = 'flex';
        emptyItem.style.opacity = 1;
        announcementBoard.appendChild(emptyItem);
    }

    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    prevPageButton.disabled = page === 0;
    nextPageButton.disabled = endIndex >= regularAnnouncementItems.length;

    const pageNumbersContainer = document.getElementById('page-numbers');
    pageNumbersContainer.innerHTML = '';
    const totalPages = Math.max(Math.ceil(regularAnnouncementItems.length / regularItemsPerPage), 1);
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
    if (!announcementBoard) {
        return;
    }

    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

function nextPage() {
    if (!announcementBoard) {
        return;
    }

    const regularItemsPerPage = Math.max(itemsPerPage - pinnedAnnouncementItems.length, 1);
    const totalPages = Math.max(Math.ceil(regularAnnouncementItems.length / regularItemsPerPage), 1);
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

if (announcementBoard) {
    showPage(currentPage);
}

const thoughtBoard = document.getElementById('thought-board');
const thoughtItems = Array.from(document.querySelectorAll('#thought-board .announcement-item'));
const thoughtItemsPerPage = 9;
let thoughtCurrentPage = 0;

function showThoughtPage(page) {
    if (!thoughtBoard) {
        return;
    }

    const startIndex = page * thoughtItemsPerPage;
    const endIndex = startIndex + thoughtItemsPerPage;

    thoughtBoard.querySelectorAll('.empty-item').forEach((item) => item.remove());

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
        emptyItem.classList.add('empty-item');
        emptyItem.style.display = 'flex';
        emptyItem.style.opacity = 1;
        thoughtBoard.appendChild(emptyItem);
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
    if (!thoughtBoard) {
        return;
    }

    if (thoughtCurrentPage > 0) {
        thoughtCurrentPage--;
        showThoughtPage(thoughtCurrentPage);
    }
}

function thoughtNextPage() {
    if (!thoughtBoard) {
        return;
    }

    const totalPages = Math.ceil(thoughtItems.length / thoughtItemsPerPage);
    if (thoughtCurrentPage < totalPages - 1) {
        thoughtCurrentPage++;
        showThoughtPage(thoughtCurrentPage);
    }
}

if (thoughtBoard) {
    showThoughtPage(thoughtCurrentPage);
}

