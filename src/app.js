// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// ^ command to output app.js to the right file/folder

// live-server public
// ^ command to start hot reloading workflow
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

const compRank = (a, b) => a._rank - b._rank;
const maxRank = cards => cards.slice().sort(compRank).pop()._rank;
class Card {
  constructor(suit, value, rank) {
    this.suit = suit;
    this.value = value;
    this._rank = rank;
  }
}
class Deck {
  constructor() {
    this.cards = [];
    let cardSuits = ['Diamonds', 'Clovers', 'Hearts', 'Spades'];
    let cardVals = [
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Jack',
      'Queen',
      'King',
      'Ace',
      'Two'
    ];
    let i = 0;
    cardVals.forEach(cardVal => {
      cardSuits.forEach(cardSuit => {
        let card = new Card(cardSuit, cardVal, i);
        this.cards.push(card);
        i++;
      });
    });
    this.shuffle();
  }

  shuffle() {
    const shuffler = arr => {
      for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
      }
    };
    shuffler(this.cards);
    return this;
  }

  deal() {
    return this.shuffle().cards.slice().splice(0,13).sort(compRank);
  }
}
class Hand {
  constructor(type, cards, strength, name) {
    this.name = name;
    this.cards = cards;
    this._type = type;
    this._strength = strength;
  }
}
const handChecker = userInput => {
  const arr = userInput.slice().sort(compRank),
    vals = arr.slice().sort(compRank).map(c => c.value),
    uniqs = _.uniq(vals);
  let str,
    name;
  switch (arr.length) {
  case 1:
    str = arr[0]._rank;
    name = `${arr[0].value} of ${arr[0].suit}`;
    return new Hand('Single', arr, 100 + str, name);
  case 2:
    if (uniqs.length !== 1)
      return null;
    str = maxRank(arr);
    name = `Double ${arr[0].value}`;
    return new Hand('Double', arr, 200 + str, name);
  case 3:
    if (uniqs.length !== 1)
      return null;
    str = maxRank(arr);
    name = `Triple ${arr[0].value}`;
    return new Hand('Triple', arr, 300 + str, name);
  case 5:
    const comboChecker = (() => {
      const countChecker = (val, qty) => arr.filter(c => c.value === val).length === qty;
      let isStraight = (input => {
          let checker = [
            'Ace',
            'Two',
            'Three',
            'Four',
            'Five',
            'Six',
            'Seven',
            'Eight',
            'Nine',
            'Ten',
            'Jack',
            'Queen',
            'King',
            'Ace',
            'Two'
          ];
          let i = checker.indexOf(uniqs[0]);
          return _.isEqual(uniqs, checker.slice(i, i + 5));
        })(arr),
        isFlush = (input => {
          return _.uniq(input.map(c => c.suit)).length === 1;
        })(arr),
        isRoyalFlush = (input => {
          return isFlush && isStraight;
        })(arr);
      if (isRoyalFlush) {
        let str = maxRank(arr);
        return {
          strength: str + 800,
          name: 'Royal Flush'
        };
      }
      if (isFlush) {
        let str = maxRank(arr);
        return {
          strength: str + 500,
          name: `Flush of ${arr[0].suit}`
        };
      }
      if (isStraight) {
        let str = maxRank(arr);
        let mainCard = arr.find(c => c._rank === str);
        return {
          strength: str + 400,
          name: `Straight to ${mainCard.value} of ${mainCard.suit}`
        };
      }
      let isHouse = (input => {
        let twoVals = uniqs.length === 2;
        let hasTrip = countChecker(uniqs[0], 3) || countChecker(uniqs[1], 3);
        let hasDub = countChecker(uniqs[0], 2) || countChecker(uniqs[1], 2);
        return twoVals && hasTrip && hasDub;
      })(arr);
      if (isHouse) {
        let trip = countChecker(uniqs[0], 3) ?
          uniqs[0] :
          uniqs[1];
        let str = maxRank(arr.filter(c => c.value === trip));
        return {
          strength: str + 600,
          name: `House of ${trip}`
        };
      }
      let isBomb = (input => {
        let twoVals = uniqs.length === 2;
        let hasQuad = countChecker(uniqs[0], 4) || countChecker(uniqs[1], 4);
        return twoVals && hasQuad;
      })(arr);
      if (isBomb) {
        let quad = countChecker(uniqs[0], 4) ?
          uniqs[0] :
          uniqs[1];
        let str = maxRank(arr.filter(c => c.value === quad));
        return {
          strength: str + 700,
          name: `Bomb of ${quad}`
        };
      }
      return null;
    })();
    if (!comboChecker)
      return null;
    str = comboChecker.strength;
    name = comboChecker.name;
    return new Hand('Combo', arr, str, name);
  default:
    return null;
  }
};


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
