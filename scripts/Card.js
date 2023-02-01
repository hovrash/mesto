import { imageFullScreenPopup, imagePopupPic, imagePopupTitle, openPopup } from "./index.js";

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
    imagePopupPic.src = this._link;
    imagePopupPic.alt = this._name;
    imagePopupTitle.textContent = this._name;
    openPopup(imageFullScreenPopup);
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