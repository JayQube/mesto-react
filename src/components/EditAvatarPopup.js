import React from "react";
import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

function EditAvatarPopup(props) {
  const inputRef = React.useRef("");

  React.useEffect(() => {
    if (!props.isOpen) {
      inputRef.current.value = "";
    }
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <>
      <PopupWithForm
        name="avatar"
        title="Редактировать профиль"
        buttonText="Сохранить"
        savingButtonText="Сохранение..."
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onOverlayClick={props.onOverlayClick}
        renderLoading={props.renderLoading}
      >
        <input
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на изображение"
          className="popup__item"
          required
          ref={inputRef}
        />
        <span className="popup__error avatar-error"></span>
      </PopupWithForm>
      <Popup
        isOpen={props.isOpen}
        onEscClick={props.onEscClick}
      />
    </>
  );
}

export default EditAvatarPopup;
