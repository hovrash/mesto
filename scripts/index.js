import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";
import { validationSettings } from "./validationSettings.js";
import { imageFullScreenPopup, openPopup, closePopup } from "./utils.js";

//popup для редактирования профиля
const profilePopup = document.querySelector('#profilePopup');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const profileCloseBtn = profilePopupContainer.querySelector('.popup__close-btn');
const profilePopupForm = document.forms.profileEdit;
const profilePopupInputName = profilePopupForm.elements.profileName;
const profilePopupInputAbout = profilePopupForm.elements.profileAbout;

//popup для добавления карточек
const newCardPopup = document.querySelector('#newCardPopup');
const newCardPopupContainer = newCardPopup.querySelector('.popup__container');
const newCardPopupForm = newCardPopupContainer.querySelector('[name="addPhoto"]');
const newCardPopupInputName = newCardPopupContainer.querySelector('[name="cardName"]');
const newCardPopupInputLink = newCardPopupContainer.querySelector('[name="cardLink"]');
const newCardCloseBtn = newCardPopupContainer.querySelector('.popup__close-btn');

//popup изображение
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
});

initialCards.forEach((item) => {
  renderCard(item, '#card-template');
});

function renderCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
};

function addImage(link, name) {
  const data = {
    name,
    link
  };
  renderCard(data, '#card-template');
};

function closePopupByClick(evt) {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.target === openPopup) {
    closePopup(openPopup);
  };
};

function handleProfileForm(evt) {
  evt.preventDefault();
  profileInfoTitle.innerText = profilePopupInputName.value;
  profileInfoSubtitle.innerText = profilePopupInputAbout.value;
  closePopup(profilePopup);
};

function handleCardForm(evt) {
  evt.preventDefault();
  addImage(newCardPopupInputLink.value, newCardPopupInputName.value)
  newCardPopupForm.reset();
  closePopup(newCardPopup);
};

function clearValidation () {
  formList.forEach((form) => {
    const newElement = new FormValidator(validationSettings, form);
    newElement.clearValidation();
  })
};

function handleOpenProfilePopup() {
  openPopup(profilePopup);
  profilePopupInputName.value = profileInfoTitle.innerText;
  profilePopupInputAbout.value = profileInfoSubtitle.innerText;
  clearValidation();
};

function handleOpenAddImagePopup () {
  openPopup(newCardPopup);
  clearValidation();
};

profileEditBtn.addEventListener('click', () => {
  handleOpenProfilePopup();
});

newCardAddBtn.addEventListener('click', () => {
  handleOpenAddImagePopup();
});

profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup)
});

newCardCloseBtn.addEventListener('click', () => {
  closePopup(newCardPopup)
});

imageCloseBtn.addEventListener('click', () => {
  closePopup(imageFullScreenPopup)
});

profilePopupForm.addEventListener('submit', handleProfileForm);

newCardPopupForm.addEventListener('submit', handleCardForm);

popupOverlays.forEach((overlay) => {
  overlay.addEventListener('mousedown', closePopupByClick);
});