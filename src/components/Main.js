import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

 

  React.useEffect(() => {
    api.getInitialInformation()
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img src={userAvatar} alt="Аватар" className="profile__avatar" />
            <div className="profile__overlay" onClick={props.onEditAvatar}></div>
          </div>

          <div className="profile__info">
            <h1 className="profile__username">{userName}</h1>
            <button className="profile__edit-btn btn-decoration" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__description">{userDescription}</p>
          </div>
          <button className="profile__add-btn btn-decoration" type="button" onClick={props.onAddPlace}></button>
        </section>

        <section className="cards">
          <ul className="cards__list">
            {cards.map(card =>
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
              />
            )}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;