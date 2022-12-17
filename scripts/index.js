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
let imagePopupContainer = imageFullScreenPopup.querySelector('.popup__container-fs');
let imagePopup = imagePopupContainer.querySelector('.popup__image');
let imageCloseBtn = imagePopupContainer.querySelector('.popup__close-btn');
let imageTitle = imagePopupContainer.querySelector('.popup__title-fs');

let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let newCardAddBtn = profile.querySelector('.profile__add-btn');
let profileTitle = profileInfo.querySelector('.profile-info__title');
let profileSubtitle = profileInfo.querySelector('.profile-info__subtitle');
let profileEditBtn = profileInfo.querySelector('.profile-info__edit-btn');

let cardContainer = document.querySelector('.elements');
const initialCards = [
    {
      name: 'Якутия',
      link: 'http://www.rosphoto.com/images/u/articles/1406/1_dementievskiy_ivan.jpg'
    },
    {
      name: 'Кольский полуостров',
      link: 'http://www.rosphoto.com/images/u/articles/1406/32_maxim_letovaltsev_edit.jpg'
    },
    {
      name: 'Байкал',
      link: 'http://www.rosphoto.com/images/u/articles/1406/16_elena_anosova_lk-a.jpg'
    },
    {
      name: 'Кабардино-Балкария',
      link: 'http://www.rosphoto.com/images/u/articles/1406/28_evgeniy_pikalov.jpg'
    },
    {
      name: 'Алтай',
      link: 'http://www.rosphoto.com/images/u/articles/1406/4_svetlana_shupenko.jpg'
    },
    {
      name: 'Карачаево-Черкесская республика',
      link: 'http://www.rosphoto.com/images/u/articles/1406/20_roman_putincev.jpg'
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

function deleteCard (element) {
  const deleteBtn = element.querySelector('.element__del-btn');
    deleteBtn.addEventListener('click', function () {
      const card = deleteBtn.closest('.element');
      card.remove()});
}

function addImage (link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__image').addEventListener('click', function() {
  imagePopup.src = link;
  imageTitle.textContent = name;
  openPopup(imageFullScreenPopup)});
  cardElement.querySelector('.element__like-btn').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like-btn_active')});
  deleteCard (cardElement);
  cardContainer.prepend(cardElement);}

  function inputSaveCardBtn (evt) {
    evt.preventDefault();
    addImage(inputCardLink.value, inputCardName.value)
    closePopup(newCardPopup);}

    initialCards.forEach(element => {
      const cardTemplate = document.querySelector('#card-template').content;
      const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
      addImage(element.link, element.name)})

profileEditBtn.addEventListener('click', function () {
  openPopup(profilePopup)});

newCardAddBtn.addEventListener('click', function () {
  openPopup(newCardPopup)});

closeBtn.addEventListener('click', function () {
  closePopup(profilePopup)});

cardCloseBtn.addEventListener('click', function () {
  closePopup(newCardPopup)});

imageCloseBtn.addEventListener('click', function () {
  closePopup(imageFullScreenPopup)});

inputSaveBtn.addEventListener('click', saveProfileBtn);

saveCardBtn.addEventListener('click', inputSaveCardBtn);