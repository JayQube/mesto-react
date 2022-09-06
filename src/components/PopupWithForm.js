function PopupWithForm({ name,
  title,
  buttonText,
  savingButtonText,
  isOpen,
  onClose,
  onSubmit,
  onOverlayClick,
  renderLoading,
  children }) {

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onOverlayClick}
    >
      <form
        className={`popup__container popup__container_type_${name}`}
        name={name}
        onSubmit={onSubmit}
      >
        <p className={`popup__title ${name === "confirm" && "popup__title_confirm"}`}>{title}</p>
        <fieldset className="popup__input-container">
          {children}
          <button
            type="submit"
            className="popup__confirm-btn"
          >
            {renderLoading ? savingButtonText : buttonText}
          </button>
        </fieldset>
        <button
          className="popup__close-btn btn-decoration"
          type="button"
          onClick={onClose}
        />
      </form>
    </div>
  );
}

export default PopupWithForm;
