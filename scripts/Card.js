import { closePopupByEsc } from "./index.js";

export const initialCards = [
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

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const image = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
    return this._element;
  }

  _handleOpenPopup() {
    const imageFullScreenPopup = document.querySelector('#imagePopup');
    const imagePopupPic = document.querySelector('.popup__image');
    const imagePopupTitle = document.querySelector('.popup__title-fs');
    imagePopupPic.src = this._link;
    imagePopupPic.alt = this._name;
    imagePopupTitle.textContent = this._name;
    imageFullScreenPopup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
  }

  _handleDeleteBtn() {
    const deleteBtn = this._element.querySelector('.element__del-btn');
    const card = deleteBtn.closest('.element');
    card.remove()
  }

  _handleLikeBtn() {
    const likeButton = this._element.querySelector('.element__like-btn');
    likeButton.classList.toggle('element__like-btn_active')
  };

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    })

    this._element.querySelector('.element__del-btn').addEventListener('click', () => {
      this._handleDeleteBtn();
    })

    this._element.querySelector('.element__like-btn').addEventListener('click', () => {
      this._handleLikeBtn();
    })
  }
}