import React from 'react';
import ReactDOM from 'react-dom';

import Deck from '../game/deck';
const myDeck = new Deck();
console.log(myDeck);

import Card from './cardComponent';

let userSelection = [];


class Root extends React.Component {
  render() {
    let cardClick = e => {
      console.log('event:', e);
    };
    return (
      <div>
        <h1>Big 2 Hand Checker</h1>
        <p>Select some cards to check a hand!</p>
        <div>
          {}
        </div>
        <div>
          <form
            style={{marginLeft: '2rem'}}>
            {
              myDeck.deal().map(card => {
                let uniqKey = Date.now().toString() + card.rank();
                return (
                  <Card
                    onClick={cardClick}
                    key={uniqKey}
                    card={card}
                    value={card.value}
                    suit={card.suit} />
                );
              })
            }
          </form>
        </div>
      </div>
    );
  }
}



var appRoot = document.getElementById('app');

ReactDOM.render(<Root />, appRoot);
