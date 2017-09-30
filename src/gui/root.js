import React from 'react';
import ReactDOM from 'react-dom';

import Deck from '../game/deck';
const myDeck = new Deck();
console.log(myDeck);

import Card from './cardComponent';

class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>Big 2 Hand Checker</h1>
        <p>Select some cards to check a hand!</p>
        <div>

        </div>
        <div>
          <form>
            {
              myDeck.deal().map(card => {
                let styles = {
                  color: card.suit === 'Diamonds' || card.suit === 'Hearts' ? 'red' : 'black',
                  backgroundColor: 'white',
                  fontSize: '24px'
                };
                return (
                  <Card
                    style={styles}
                    key={card._rank}
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
