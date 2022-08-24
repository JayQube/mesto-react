function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <form className={`popup__container popup__container_type_${props.name}`} name={props.name} action="#" method="post" noValidate>
          <p className="popup__title">{props.title}</p>
          <fieldset className="popup__input-container">
            {props.children}
            <input type="submit" className="popup__confirm-btn" value={props.buttonText}/>
          </fieldset>
          <button className="popup__close-btn btn-decoration" type="button" onClick={props.onClose}></button>
        </form>
      </div>
    </>
  );
}

export default PopupWithForm;