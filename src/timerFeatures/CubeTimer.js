import React, {Component} from 'react';
import Clock from './Clock';
import TimeData from './TimeData';
import EventSelection from './EventSelection';
import './CubeTimer.css';
//import axios from 'axios';
var Scrambow = require('scrambow').Scrambow;

export default class CubeTimer extends Component {
    constructor(props){
        super(props);
        this.state = {
            solveTimes: [],
            eventTimes: {'222': [], '333': [], '444': [], '555': [], '666': [], '777': [], 'megaminx': [], 'pyraminx': [], 'skewb': [], 'sq1': []},
            currEvent: '333',
            scramble: null,
            nextScramble: null,

            currAvg5: null,
            currAvg12: null,
            currMean100: null,

            // replace later with backend calls 
            bestAvg5: null, 
            bestAvg12: null,
            bestMean100: null
        }
        this.handleTimeDeletion = this.handleTimeDeletion.bind(this);
        this.handlePlusTwo = this.handlePlusTwo.bind(this);
        this.handleDnf = this.handleDnf.bind(this);
    }
    
    componentDidMount() {
        this.initScrambles();
    }

    changeEvent = (newEvent) => {
      if (this.state.currEvent !== newEvent) {
        let newTimes = [...this.state.eventTimes[newEvent]];
        this.setState({currEvent: newEvent, solveTimes: newTimes}, () => {
          this.initScrambles();
          this.calcAvgOf5();
          this.calcAvgOf12();
          this.calcMeanOf100();
        }); 
      }
    }

    initScrambles = () => {
      this.setState({scramble: this.getScramble()});
      this.setState({nextScramble: this.getScramble()});
    }

    updateScramble() {
      // move loaded scramble to main scramble
      let scram = this.state.nextScramble;
      this.setState({scramble: scram})

      // load next scramble
      this.setState({nextScramble: this.getScramble()})
    }

    getScramble() {
      // generate seed
      let seed = Math.floor(Math.random() * 100000);

      // generate scramble
      var seeded_scramble = new Scrambow().setType(this.state.currEvent).setSeed(seed).get();

      return seeded_scramble[0].scramble_string;
      
      /*
      try {
        const res = await axios({
          method: 'get',
          url: `http://localhost:5000/timer/getScramble`,
          headers: {}, 
          params: {
            n: '1',
            cube: '3x3'
          }
        })
        return res.data.scrambles[0]
      } catch (err) {
        console.log(err);
      }*/
    }

    handleNewTime = (childData) => {
      childData['scramble'] = this.state.scramble;
      
      // add to current list
      this.setState(prevState => ({
        solveTimes: [childData, ...prevState.solveTimes]
      }));
      
      // add to event list
      var copyEventTimes = {...this.state.eventTimes};
      copyEventTimes[this.state.currEvent] = [childData, ...this.state.eventTimes[this.state.currEvent]];
      this.setState({
        eventTimes: copyEventTimes
      });

      this.updateScramble();
      this.calcAvgOf5();
      this.calcAvgOf12();
      this.calcMeanOf100();
      console.log(this.state);
    }

    handleTimeDeletion(index) {
      const newTimes = [...this.state.solveTimes];
      newTimes.splice(index, 1);
      this.setState({solveTimes: newTimes}, () => {
        // recalculate averages 
        this.calcAvgOf5();
        this.calcAvgOf12();
        this.calcMeanOf100();
      })
    }

    handlePlusTwo(index) {
      // copy state
      let newTimes = [...this.state.solveTimes];
      let item = {...newTimes[index]};
      
      // can't have dnf and plus two
      item.dnf = false

      // update times
      if (item.plusTwo) {
        item.time -= 200;
      }
      else {
        item.time += 200;
      }

      // update state
      item.plusTwo = !item.plusTwo;
      newTimes[index] = item;
      this.setState({solveTimes: newTimes}, () => {
        // recalculate averages 
        this.calcAvgOf5();
        this.calcAvgOf12();
        this.calcMeanOf100();
      })
    }

    handleDnf(index) {
      // copy state
      let newTimes = [...this.state.solveTimes];
      let item = {...newTimes[index]};

      // can't have plus two and dnf
      if (item.plusTwo) {
        item.plusTwo = false
        item.time -= 200
      }

      // change dnf
      item.dnf = !item.dnf; 

      // update state
      newTimes[index] = item;
      this.setState({solveTimes: newTimes}, () => {
      
        // recalculate averages 
        this.calcAvgOf5();
        this.calcAvgOf12();
        this.calcMeanOf100();
      })

    } 
    
    calcAvg(arr) {
      console.log(arr);
      let times = arr.filter(x => !x.dnf).map(x => x.time);
      
      // avg is dnf if at least 2 DNF's
      if (arr.length - times.length >= 2) {
        return "DNF";
      }

      // avg max times if one DNF
      else if (times.length === arr.length - 1) {
        let sum = times.reduce((a, b) => a + b, 0);
        let avg = (sum - Math.min(...times)) / (arr.length - 2);
        return Math.round(avg)
      }

      // normal avg for no DNF's
      else {
        let sum = times.reduce((a, b) => a + b, 0);
        let avg = (sum - Math.min(...times) - Math.max(...times)) / (arr.length - 2);
        return Math.round(avg);
      }
    }

    // returns the best average of 
    getBestAvg(len) {
      var i;
      var best = null;
      for (i = 0; i < this.state.solveTimes.length - len + 1; i++) {
        console.log(this.state.solveTimes.slice(i, i + len));
        let thisAvg = this.calcAvg(this.state.solveTimes.slice(i, i + len));
        if (best === null || thisAvg < best) {
          best = thisAvg;
        }
      }
      return best;
    }

    calcAvgOf5() {
      if (this.state.solveTimes.length >= 5) {
        this.setState({currAvg5: this.calcAvg(this.state.solveTimes.slice(0, 5))})
        this.setState({bestAvg5: this.getBestAvg(5)})
      }
      else {
        this.setState({currAvg5: null})
        this.setState({bestAvg5: null})
      }
    }

    calcAvgOf12() {
      if (this.state.solveTimes.length >= 12) {
        this.setState({currAvg12: this.calcAvg(this.state.solveTimes.slice(0, 12))})
        this.setState({bestAvg12: this.getBestAvg(12)})
      }
      else {
        this.setState({currAvg12: null})
        this.setState({bestAvg12: null})
      }
    }
    

    calcMeanOf100() {
      if (this.state.solveTimes.length >= 100) {
        let times = this.state.solveTimes.slice(0, 100).filter(x => !x.dnf).map(x => x.time);
        let sum = times.reduce((a, b) => a + b, 0);
        let mean = Math.round(sum / times.length);
        this.setState({ currMean100: mean });

        // handle new best
        if (this.state.bestMean100 === null || this.state.currMean100 < this.state.bestMean100) {
          this.setState({ bestMean100: Math.round(this.state.currMean100)})
        }
      }
      else {
        this.setState({currMean100: null})
        this.setState({bestMean100: null})
      }   
    }

    render() {
        return (
          <div id="cube-timer-entire-page">
            <EventSelection eventChangeCallback={this.changeEvent}/>
            <div id="cube-timer-main">
              <div id="scramble-text">{this.state.scramble}</div>
              <Clock parentCallback = {this.handleNewTime} />
              <TimeData {...this.state} deleteCallback = {this.handleTimeDeletion} plusTwoCallback = {this.handlePlusTwo} dnfCallback = {this.handleDnf}/>
            </div>
          </div>
        )
    }
}