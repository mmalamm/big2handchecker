import React from 'react';

const valsObj = {
  'Three': '3',
  'Four': '4',
  'Five': '5',
  'Six': '6',
  'Seven': '7',
  'Eight': '8',
  'Nine': '9',
  'Ten': '10',
  'Jack': 'J',
  'Queen': 'Q',
  'King': 'K',
  'Ace': 'A',
  'Two': '2'
};

const suitsObj = {
  'Spades': '♠',
  'Hearts': '♥',
  'Clovers': '♣',
  'Diamonds': '♦'
};

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let styles = {
      color: this.props.suit === 'Diamonds' || this.props.suit === 'Hearts'
        ? 'red'
        : 'black',
      backgroundColor: 'white',
      fontSize: '2rem',
      border: '.1rem solid red',
      margin: '.2rem',
      borderRadius: '.3rem',
      width: '4rem'
    };
    let none = 'none';
    let unselectable = {
      MozUserSelect: none,
      WebkitUserSelect: none,
      msUserSelect: none,
      pointerEvents: none
    };
    return (
      <div key={this.props._rank} style={styles}>
        <p style={unselectable}>
          {valsObj[this.props.value]}
        </p>
        <p style={unselectable}>
          {suitsObj[this.props.suit]}
        </p>
      </div>

    );

  }
}
export default Card;
