import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "../css/Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }
  componentDidMount = () => {
    this.animateRoll();
  }

  animateRoll = () => {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false
    }));
  }

  displayRollInfo = () => {

    const messages = [
      "0 Rolls Left",
      `1 Roll \u00A0 Left`,
      "2 Rolls Left",
      "Starting Round"
    ]
    return messages[this.state.rollsLeft];
  }



  toggleLocked(idx) {

    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0 && !this.state.rolling) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.animateRoll();
  }

  reset = () => {
    this.setState({
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    });
    this.animateRoll();
  }



  render() {
    const { scores, locked } = this.state;

    return (
      <div className='Game'>
        <header className='Game-header'>
          <div className='help'>
            <a href='http://www.yahtzee.org.uk/rules.html' target='_blank'>
              <i class="fas fa-question-circle"></i>
            </a>
          </div>
          <h1 className='App-title'>Yahtzee!</h1>
          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              disabled={this.state.rollsLeft === 0 || Object.keys(this.state.scores).every(k => this.state.scores[k] !== undefined)}
              rolling={this.state.rolling}
            />
            <div className='Game-button-wrapper'>
              {Object.keys(scores).every(k => scores[k] !== undefined) ?
                <div>
                  {locked.fill(true)}
                  <h1 className='gameOver'>GAME OVER</h1>
                </div> :
                <button
                  className='Game-reroll'
                  disabled={this.state.locked.every(x => x)
                    || this.state.rollsLeft === 0
                    || this.state.rolling}
                  onClick={this.animateRoll}
                >
                  {this.displayRollInfo()}
                </button>}

            </div>
            <button className='Restart' onClick={this.reset}>Restart?</button>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />

      </div>
    );
  }
}

export default Game;
