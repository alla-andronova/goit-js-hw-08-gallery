import galleryItems from './gallery-items.js';
// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const listGalleryEL = document.querySelector('.js-gallery');
const modalLightBoxEL = document.querySelector('.js-lightbox');
const lightBoxImageEL = document.querySelector('.lightbox__image');

const makeGalleryItemMarkup = ({ preview, original, description }) => {
  return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
 
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li> `;
};

const makeGalleryItems = galleryItems.map(makeGalleryItemMarkup).join('');
listGalleryEL.insertAdjacentHTML('afterbegin', makeGalleryItems);

// Реализация делегирования на галерее ul.js - gallery и получение url
// большого изображения.
listGalleryEL.addEventListener('click', onImgGalleryClick);

function onImgGalleryClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const imgOriginalUrl = e.target.dataset.source;
  e.target.classList.add('current');
  // Открытие модального окна по клику на элементе галереи.
  modalLightBoxEL.classList.add('is-open');

  // Подмена значения атрибута src элемента img.lightbox__image.
  lightBoxImageEL.src = imgOriginalUrl;
}

// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');

closeBtn.addEventListener('click', onCloseBtnClick);

function onCloseBtnClick(e) {
  modalLightBoxEL.classList.remove('is-open');
  // Очистка значения атрибута src элемента img. lightbox__image.Это необходимо для того,
  // чтобы при следующем открытии модального окна,
  // пока грузится изображение, мы не видели предыдущее.
  lightBoxImageEL.src = '';
  const current = document.querySelector('.gallery__image.current');
  current.classList.remove('current');
}

// Закрытие модального окна по клику на div.lightbox__overlay.
const containerOverlayEL = document.querySelector('.lightbox__overlay');
containerOverlayEL.addEventListener('click', onCloseBtnClick);

// Закрытие модального окна по нажатию клавиши ESC.
window.addEventListener('keydown', onEscPress);
function onEscPress(e) {
  if (e.code === 'Escape') {
    onCloseBtnClick();
  }
}
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

window.addEventListener('keyup', onBtnPress);
function onBtnPress(e) {
  const isOpen = modalLightBoxEL.classList.contains('is-open');
  if (e.code === 'ArrowRight' && isOpen) {
    const currentImgEL = document.querySelector('.gallery__image.current');
    const currentListEl = currentImgEL.parentNode.parentNode;
    const nextNextListEL = currentListEl.nextSibling.nextSibling;
    // console.log(nextNextListEL);
    if (!nextNextListEL) {
      return;
    }
    const nextImgEL = nextNextListEL.children[0].children[0];
    lightBoxImageEL.src = nextImgEL.dataset.source;

    const current = document.querySelector('.gallery__image.current');
    current.classList.remove('current');

    nextImgEL.classList.add('current');
  }

  if (e.code === 'ArrowLeft' && isOpen) {
    const currentImgEL = document.querySelector('.gallery__image.current');
    const currentListEl = currentImgEL.parentNode.parentNode;
    const prevListEL = currentListEl.previousSibling.previousSibling;
    // console.log(nextNextListEL);
    if (!prevListEL) {
      return;
    }
    const prevtImgEL = prevListEL.children[0].children[0];
    lightBoxImageEL.src = prevtImgEL.dataset.source;

    const current = document.querySelector('.gallery__image.current');
    current.classList.remove('current');

    prevtImgEL.classList.add('current');
  }
}
