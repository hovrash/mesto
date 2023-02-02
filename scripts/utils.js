export const imageFullScreenPopup = document.querySelector('#imagePopup');
export const imagePopupPic = imageFullScreenPopup.querySelector('.popup__image');
export const imagePopupTitle = imageFullScreenPopup.querySelector('.popup__title-fs');

export function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

export function closePopupByEsc(evt) {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openPopup);
  }
};

export function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};