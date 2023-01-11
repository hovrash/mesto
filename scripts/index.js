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
const newCardCloseBtn = newCardPopupContainer.querySelector('.popup__close-btn');//разобраться с этой кнопкой, надо сделать одну нам все попапы

//popup изображение
const imageFullScreenPopup = document.querySelector('#imagePopup');
const imagePopupContainer = imageFullScreenPopup.querySelector('.popup__container-fs');
const imagePopupPic = imagePopupContainer.querySelector('.popup__image');
const imagePopupTitle = imagePopupContainer.querySelector('.popup__title-fs');
const imageCloseBtn = imagePopupContainer.querySelector('.popup__close-btn');

const profile = document.querySelector('.profile');
const newCardAddBtn = profile.querySelector('.profile__add-btn');
const profileInfo = profile.querySelector('.profile-info');
const profileInfoTitle = profileInfo.querySelector('.profile-info__title');
const profileInfoSubtitle = profileInfo.querySelector('.profile-info__subtitle');
const profileEditBtn = profileInfo.querySelector('.profile-info__edit-btn');

const cardContainer = document.querySelector('.elements');

const popupOverlays = document.querySelectorAll('.popup'); 

function closePopupByEsc (evt) {
  const openPopup = document.querySelector('.popup_opened');
  if(evt.key === "Escape") {
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

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  hideInputError(profilePopupForm, profilePopupInputName);
  hideInputError(profilePopupForm, profilePopupInputAbout);
  newCardPopupSaveBtn.classList.add('input__save-btn_inactive');
  document.removeEventListener('keydown', closePopupByEsc);
};

function handleProfileForm(evt) {
  evt.preventDefault();
  profileInfoTitle.innerText = profilePopupInputName.value;
  profileInfoSubtitle.innerText = profilePopupInputAbout.value;
  closePopup(profilePopup);
}

function deleteCard(element) {
  const deleteBtn = element.querySelector('.element__del-btn');
  deleteBtn.addEventListener('click', function () {
    const card = deleteBtn.closest('.element');
    card.remove()
  });
}

function addImage(link, name) {
  const cardElement = createCard(link, name);
  cardContainer.prepend(cardElement);
}

function createCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__title').textContent = name;
  image.src = link;
  image.alt = name;
  image.addEventListener('click', function () {
    imagePopupPic.src = link;
    imagePopupPic.alt = name;
    imagePopupTitle.textContent = name;
    openPopup(imageFullScreenPopup)
  });
  cardElement.querySelector('.element__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active')
  });
  deleteCard(cardElement);
  return cardElement;
}

function handleCardForm(evt) {
  evt.preventDefault();
  addImage(newCardPopupInputLink.value, newCardPopupInputName.value)
  newCardPopupForm.reset();
  closePopup(newCardPopup);
}

initialCards.forEach(element => {
  addImage(element.link, element.name)
})

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