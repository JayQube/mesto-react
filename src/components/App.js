import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);


  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Имя"
          className="popup__item"
          required
          minLength="2"
          maxLength="40"
        />
        <span
          className="popup__error name-error">
        </span>
        <input
          type="text"
          id="about"
          name="about"
          placeholder="Описание"
          className="popup__item"
          required
          minLength="2"
          maxLength="200"
        />
        <span
          className="popup__error about-error">
        </span>
      </PopupWithForm>

      <PopupWithForm
        name="place"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Название"
          className="popup__item"
          required
          minLength="2"
          maxLength="30"
        />
        <span
          className="popup__error title-error">
        </span>
        <input
          type="url"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__item"
          required
        />
        <span
          className="popup__error link-error">
        </span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на изображение"
          className="popup__item"
          required
          minLength="2"
          maxLength="40"
        />
        <span
          className="popup__error avatar-error">
        </span>
      </PopupWithForm>
      
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
      >
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <Footer />
    </>
  );
}

export default App;
