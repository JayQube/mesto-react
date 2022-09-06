import React from "react";
import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

function AddPlacePopup(props) {

  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    if (props.isOpen) {
      setTitle("");
      setLink("");
    }
  }, [props.isOpen])

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      title: title,
      link: link,
    });
  }

  return (
    <>
      <PopupWithForm
        name="place"
        title="Новое место"
        buttonText="Создать"
        savingButtonText="Сохранение..."
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onOverlayClick={props.onOverlayClick}
        renderLoading={props.renderLoading}
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
          value={title || ""}
          onChange={handleTitleChange}
        />
        <span className="popup__error title-error"></span>
        <input
          type="url"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__item"
          required
          value={link || ""}
          onChange={handleLinkChange}
        />
        <span className="popup__error link-error"></span>
      </PopupWithForm>
      <Popup
        isOpen={props.isOpen}
        onEscClick={props.onEscClick}
      />
    </>

  )
}

export default AddPlacePopup;
