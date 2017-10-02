import React from 'react';
import Card from './cardComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelection: [],
      hand: this.props.deck.deal()
    };
    // this.cardClick = this.cardClick.bind(this);
  }

  // cardClick(card) {
  //   return e => {
  //     console.log('event:', e.target);
  //     console.log(card);
  //   };
  // }


  render() {
    let callback = card => {
      return e => this.setState(prevState => {
        if (prevState.userSelection.indexOf(card) === -1) {
          return { userSelection: prevState.userSelection.concat(card)};
        } else {
          return { userSelection: prevState.userSelection.filter(c => c !== card)};
        }
      });
    };
    let handleClear = () => {
      return e => this.setState(prevState => {
        return { userSelection: []};
      });
    };
    return (
      <div>
        <h1>Big 2 Hand Checker</h1>
        <p>Select some cards to check a hand!</p>
        <div>
          <form>
            {
              this.state.hand.map(card => {
                let uniqKey = Date.now().toString() + card.rank();
                return (
                  <div
                    key={uniqKey}
                    onClick={callback(card)}>
                    <Card
                      value={card.value}
                      suit={card.suit} />
                  </div>
                );
              })
            }
          </form>
        </div>
        <div>
          <form>
            {
              this.state.userSelection.map(card => {
                let uniqKey = Date.now().toString() + card.rank();
                return (
                  <div
                    key={uniqKey}>
                    <Card
                      value={card.value}
                      suit={card.suit} />
                  </div>
                );
              })
            }
          </form>
          <button onClick={handleClear()}>
            Clear Selection
          </button>
        </div>
      </div>
    );
  }
}

export default App;
