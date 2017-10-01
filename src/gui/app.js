import React from 'react';
import Card from './cardComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelection: []
    };
    this.cardClick = this.cardClick.bind(this);
  }

  cardClick(card) {
    return e => {
      console.log('event:', e.target);
      console.log(card);
    };
  }


  render() {
    return (
      <div>
        <h1>Big 2 Hand Checker</h1>
        <p>Select some cards to check a hand!</p>
        <div>
          {this.state.userSelection}
        </div>
        <div>
          <form
            style={{marginLeft: '1rem'}}>
            {
              this.props.deck.deal().map(card => {
                let uniqKey = Date.now().toString() + card.rank();
                return (
                  <div
                    key={uniqKey}
                    onClick={this.cardClick(card)}>
                    <Card
                      card={card}
                      value={card.value}
                      suit={card.suit} />
                  </div>
                );
              })
            }
          </form>
        </div>
      </div>
    );
  }
}

export default App;
