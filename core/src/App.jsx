import './App.css';
import { useState } from 'react';

function App() {
  const [cardsList, setCardsList] = useState([
    {id: 1, order: 3, text: 'Карточка 3'},
    {id: 2, order: 1, text: 'Карточка 1'},
    {id: 3, order: 2, text: 'Карточка 2'},
    {id: 4, order: 4, text: 'Карточка 4'},
  ])

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(e, card) {
    console.log('drag', card)

    setCurrentCard(card);
  }

  function dragEndHandler(e) {
    // снимаем выделение карточки, над которой переносили выбранную карточку
    e.target.style.background = 'white';
  }

  function dragOverHandler(e) {
    e.preventDefault();

    // выделяем карточку, над которой переносим выбранную карточку
    e.target.style.background = 'lightgray';
  }

  function dropHandler(e, card) {
    e.preventDefault();

    setCardsList(cardsList.map(c => {
      if (c.id === card.id) {
        return {...c, order: currentCard.order}
      }

      if (c.id === currentCard.id) {
        return {...c, order: card.order}
      }

      return c
    }))

    e.target.style.background = 'white';
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="app">
      {
        cardsList.sort(sortCards).map(card => 
          <div 
            onDragStart={e => dragStartHandler(e, card)}
            onDragLeave={e => dragEndHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e, card)}
            draggable="true"
            className="card"
          >
            {card.text}
          </div>
        )
      }
    </div>
  );
}

export default App;
