import React from 'react';
import Card from './cardComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.newDeal = this.newDeal.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.state = {
      userSelection: [],
      hand: this.props.deck.deal()
    };
  }

  newDeal(e) {
    e.preventDefault();
    this.setState(() => {
      return {hand: this.props.deck.deal()};
    });
  }

  handleClear(e) {
    e.preventDefault();
    this.setState(() => {
      return { userSelection: [] };
    });
  }

  toggleSelect(card) {
    return e => this.setState(prevState => {
      if (prevState.userSelection.indexOf(card) === -1) {
        return { userSelection: prevState.userSelection.concat(card)};
      } else {
        return { userSelection: prevState.userSelection.filter(c => c !== card)};
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Big 2 Hand Checker</h1>
        <p>Select some cards to check a hand!</p>
        <div>
          <form>
            {
              this.state.hand.map(card => {
                let uniqKey = Date.now().toString() + card.rank();
                let selectionState = this.state.userSelection.find(c => c === card);
                return (
                  <div
                    key={uniqKey}
                    onClick={this.toggleSelect(card)}>
                    <Card
                      selected={selectionState}
                      value={card.value}
                      suit={card.suit} />
                  </div>
                );
              })
            }
          </form>
        </div>
        <div>
          <button onClick={this.handleClear}>
            Clear Selection
          </button>
          <button onClick={this.newDeal}>
            Deal
          </button>
        </div>
        <div>
          {}
        </div>
      </div>
    );
  }
}

export default App;
