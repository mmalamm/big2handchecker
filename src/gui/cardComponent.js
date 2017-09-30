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

const Card = (props) => {
  return (
    <section
    key={props._rank}
    style={props.styles}>
      <p>
      {valsObj[props.value]}
      </p>
      <p>
      {suitsObj[props.suit]}
      </p>
    </section>

  );
}
export default Card;
