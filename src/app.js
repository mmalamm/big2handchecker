import React from 'react';
import ReactDOM from 'react-dom';




const valsObj = {
  'Three':'3',
  'Four':'4',
  'Five':'5',
  'Six':'6',
  'Seven':'7',
  'Eight':'8',
  'Nine':'9',
  'Ten':'10',
  'Jack':'J',
  'Queen':'Q',
  'King':'K',
  'Ace':'A',
  'Two':'2'
};

const suitsObj = {
  'Spades':'♠',
  'Hearts':'♥',
  'Clovers': '♣',
  'Diamonds': '♦'
};
import Deck from './game/deck';
const myDeck = new Deck();
console.log(myDeck);

console.log('heya! world');


let template = (
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
              <section
                key={card._rank}
                style={styles}>
                <p>
                  {valsObj[card.value]}
                </p>
                <p>
                  {suitsObj[card.suit]}
                </p>
              </section>
            );
          })
        }
      </form>
    </div>
  </div>
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
