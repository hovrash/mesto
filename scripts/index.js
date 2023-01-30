import { initialCards, Card } from "./Card.js";
import { validationSettings, FormValidator } from "./FormValidator.js";

//popup для редактирования профиля
const profilePopup = document.querySelector('#profilePopup');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const profilePopupSaveBtn = profilePopupContainer.querySelector('.input__save-btn');
const profileCloseBtn = profilePopupContainer.querySelector('.popup__close-btn');
const profilePopupForm = document.forms.profileEdit;
const profilePopupInputName = profilePopupForm.elements.profileName;
const profilePopupInputAbout = profilePopupForm.elements.profileAbout;

//popup для добавления карточек
const newCardPopup = document.querySelector('#newCardPopup');
const newCardPopupContainer = newCardPopup.querySelector('.popup__container');
const newCardPopupForm = newCardPopupContainer.querySelector('[name="addPhoto"]');
const newCardPopupSaveBtn = newCardPopupContainer.querySelector('.input__save-btn');
const newCardPopupInputName = newCardPopupContainer.querySelector('[name="cardName"]');
const newCardPopupInputLink = newCardPopupContainer.querySelector('[name="cardLink"]');
const newCardCloseBtn = newCardPopupContainer.querySelector('.popup__close-btn');

//popup изображение
const imageFullScreenPopup = document.querySelector('#imagePopup');
const imagePopupContainer = imageFullScreenPopup.querySelector('.popup__container-fs');
const imageCloseBtn = imagePopupContainer.querySelector('.popup__close-btn');

const profile = document.querySelector('.profile');
const newCardAddBtn = profile.querySelector('.profile__add-btn');
const profileInfo = profile.querySelector('.profile-info');
const profileInfoTitle = profileInfo.querySelector('.profile-info__title');
const profileInfoSubtitle = profileInfo.querySelector('.profile-info__subtitle');
const profileEditBtn = profileInfo.querySelector('.profile-info__edit-btn');

const popupOverlays = document.querySelectorAll('.popup'); 

const formList = Array.from(document.querySelectorAll('.input'));

formList.forEach((form) => {
  const newElement = new FormValidator(validationSettings, form);
  newElement.enableValidation();
})

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
});


export function closePopupByEsc (evt) {
  const openPopup = document.querySelector('.popup_opened');
  if(evt.key === 'Escape') {
    closePopup(openPopup);
  }
}

function closePopupByClick (evt) {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.target === openPopup) {
    closePopup(openPopup);
  };
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  profilePopupSaveBtn.classList.remove('input__save-btn_inactive');
  document.addEventListener('keydown', closePopupByEsc);
  };
  
  const hideInputError = (form, input, set) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(set.inputErrorClass);
    errorElement.textContent = '';
  }
  

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  hideInputError(profilePopupForm, profilePopupInputName, validationSettings);
  hideInputError(profilePopupForm, profilePopupInputAbout, validationSettings);
  newCardPopupSaveBtn.classList.add('input__save-btn_inactive');
  document.removeEventListener('keydown', closePopupByEsc);
};

function handleProfileForm(evt) {
  evt.preventDefault();
  profileInfoTitle.innerText = profilePopupInputName.value;
  profileInfoSubtitle.innerText = profilePopupInputAbout.value;
  closePopup(profilePopup);
}

function addImage(link, name) {
  const data = {
    name,
    link
  };
  const card = new Card(data, '#card-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
}

function handleCardForm(evt) {
  evt.preventDefault();
  addImage(newCardPopupInputLink.value, newCardPopupInputName.value)
  newCardPopupForm.reset();
  closePopup(newCardPopup);
}

profileEditBtn.addEventListener('click', function () {
  openPopup(profilePopup);
  profilePopupInputName.value = profileInfoTitle.innerText;
  profilePopupInputAbout.value = profileInfoSubtitle.innerText;
});

newCardAddBtn.addEventListener('click', function () {
  openPopup(newCardPopup)
});

profileCloseBtn.addEventListener('click', function () {
  closePopup(profilePopup)
});

newCardCloseBtn.addEventListener('click', function () {
  closePopup(newCardPopup)
});

imageCloseBtn.addEventListener('click', function () {
  closePopup(imageFullScreenPopup)
});

profilePopupForm.addEventListener('submit', handleProfileForm);

newCardPopupForm.addEventListener('submit', handleCardForm);

popupOverlays.forEach((overlay) => { 
  overlay.addEventListener('mousedown', closePopupByClick); 
})

