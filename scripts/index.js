//popup для редактирования профиля
let profilePopup = document.querySelector('#profilePopup');
let popupContainer = profilePopup.querySelector('.popup__container');
let inputSaveBtn = popupContainer.querySelector('.input__save-btn');
let inputName = popupContainer.querySelector('[name="profileName"]');
let inputAbout = popupContainer.querySelector('[name="profileAbout"]');
let closeBtn = popupContainer.querySelector('.popup__close-btn');

//popup для добавления карточек
let newCardPopup = document.querySelector('#newCardPopup');
let newCardContainer = newCardPopup.querySelector('.popup__container');
let saveCardBtn = newCardContainer.querySelector('.input__save-btn');
let inputCardName = newCardContainer.querySelector('[name="cardName"]');
let inputCardLink = newCardContainer.querySelector('[name="cardLink"]');
let cardCloseBtn = newCardContainer.querySelector('.popup__close-btn');

//popup изображение
let imageFullScreenPopup = document.querySelector('#imagePopup');
let imagePopupContainer = imageFullScreenPopup.querySelector('.image-popup__container');
let imagePopup = imagePopupContainer.querySelector('.image-popup__image');
let imageCloseBtn = imagePopupContainer.querySelector('.popup__close-btn');
let imageTitle = imagePopupContainer.querySelector('.image-popup__title');

let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let newCardAddBtn = profile.querySelector('.profile__add-btn');
let profileTitle = profileInfo.querySelector('.profile-info__title');
let profileSubtitle = profileInfo.querySelector('.profile-info__subtitle');
let profileEditBtn = profileInfo.querySelector('.profile-info__edit-btn');

let cardContainer = document.querySelector('.elements');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  function openPopup (popupName) {
    popupName.classList.add('popup_opened');
    if (popupName === profilePopup) {
      inputName.value = profileTitle.innerText;
      inputAbout.value = profileSubtitle.innerText;
    } else if (popupName === imageFullScreenPopup) {
      imageFullScreenPopup.style.backgroundColor = "rgba(0, 0, 0, .9)"
    }
  };

  function closePopup (popupName) {
    if (popupName === newCardPopup) {
      inputCardName.value = "";
      inputCardLink.value = "";
    }
    popupName.classList.remove('popup_opened');
  }

  function saveProfileBtn (evt) {
    evt.preventDefault();
    profileTitle.innerText = inputName.value;
    profileSubtitle.innerText = inputAbout.value;
    closePopup(profilePopup);
}

  function inputSaveCardBtn (evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = inputCardLink.value;
    cardElement.querySelector('.element__title').textContent = inputCardName.value;
    deleteCard (cardElement);
    cardElement.querySelector('.element__like-btn').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-btn_active');
    });
    cardContainer.prepend(cardElement);
    closePopup(newCardPopup);
}

  function deleteCard (element) {
    const deleteBtn = element.querySelector('.element__del-btn');
      deleteBtn.addEventListener('click', function () {
        const card = deleteBtn.closest('.element');
        card.remove();
      });
  }

    initialCards.forEach(element => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__title').textContent = element.name;
    deleteCard (cardElement);
    cardElement.querySelector('.element__image').addEventListener('click', function() {
      imagePopup.src = element.link;
      imageTitle.textContent = element.name;
      openPopup(imageFullScreenPopup);
      console.log(imageFullScreenPopup.classList);
    });

    cardElement.querySelector('.element__like-btn').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-btn_active');
    });
    cardContainer.prepend(cardElement);
});

profileEditBtn.addEventListener('click', function () {
  openPopup(profilePopup);
});

newCardAddBtn.addEventListener('click', function () {
  openPopup(newCardPopup);});

closeBtn.addEventListener('click', function () {
  closePopup(profilePopup);});

cardCloseBtn.addEventListener('click', function () {
  closePopup(newCardPopup);});

inputSaveBtn.addEventListener('click', saveProfileBtn);

saveCardBtn.addEventListener('click', inputSaveCardBtn);