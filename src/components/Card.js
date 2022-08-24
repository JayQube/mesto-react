function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <button type="button" className="card__trash-btn card__trash-btn_action_delete btn-decoration"></button>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes-container">
          <button type="button" className="card__like-btn btn-decoration"></button>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;