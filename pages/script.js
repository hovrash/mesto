let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let saveBtn = popupContainer.querySelector('.popup__save-btn');
let inputContainer = popupContainer.querySelector('.input');
let inputName = inputContainer.querySelector('.input__text_type_name');
let inputAbout = inputContainer.querySelector('.input__text_type_about');
let closeBtn = popupContainer.querySelector('.popup__close-btn');
let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let profileTitle = profileInfo.querySelector('.profile-info__title');
let profileSubtitle = profileInfo.querySelector('.profile-info__subtitle');
let profileEditBtn = profileInfo.querySelector('.profile-info__edit-btn');

function popupOpen () {
    inputName.value = profileTitle.innerText;
    inputAbout.value = profileSubtitle.innerText;
    popup.classList.add('popup_opened');
}

function popupClose () {
    popup.classList.remove('popup_opened');
}

function popupSaveBtn (evt) {
    evt.preventDefault();
    profileTitle.innerText = inputName.value;
    profileSubtitle.innerText = inputAbout.value;
    popupClose();
}

profileEditBtn.addEventListener('click', popupOpen);

closeBtn.addEventListener('click', popupClose );

saveBtn.addEventListener('click', popupSaveBtn);