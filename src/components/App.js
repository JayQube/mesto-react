import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isFullscreenPopupOpen, setIsFullscreenPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [renderLoading, setRenderLoading] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });
  const [removableCard, setRemovableCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsFullscreenPopupOpen(!isFullscreenPopupOpen);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleDeleteClick(card) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemovableCard(card);
  }

  function handleUpdateUser(inputValues) {
    setRenderLoading(true);
    api
      .setUserInfo(inputValues)
      .then((info) => {
        setCurrentUser(info);
      })
      .then(() => {
        closeAllPopups();
        setRenderLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(inputValues) {
    setRenderLoading(true);
    api
      .setUserAvatar(inputValues)
      .then((info) => {
        setCurrentUser(info);
      })
      .then(() => {
        closeAllPopups();
        setRenderLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(inputValues) {
    setRenderLoading(true);
    api
      .addCard(inputValues)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
        setRenderLoading(false);
      })
  }

  function onOverlayClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsFullscreenPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  React.useEffect(() => {
    api
      .getInitialInformation()
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteClick}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onEscClick={handleEscClose}
        onOverlayClick={onOverlayClick}
        renderLoading={renderLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onEscClick={handleEscClose}
        onOverlayClick={onOverlayClick}
        renderLoading={renderLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onEscClick={handleEscClose}
        onOverlayClick={onOverlayClick}
        renderLoading={renderLoading}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        card={removableCard}
        onConfirm={handleCardDelete}
        onEscClick={handleEscClose}
        onOverlayClick={onOverlayClick}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isFullscreenPopupOpen}
        onClose={closeAllPopups}
        onEscClick={handleEscClose}
        onOverlayClick={onOverlayClick}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
