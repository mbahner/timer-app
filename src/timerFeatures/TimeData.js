import React, {Component} from 'react';
import './TimeData.css'

export default class TimeData extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatTime(secs) {
        if (secs === "DNF") {
            return "DNF";
        }
        if (secs === null) {
            return "---"
        }
        let hours   = Math.floor(secs / 360000);
        let minutes = Math.floor(secs / 6000) % 6000;
        let seconds = Math.floor(secs / 100) % 60;
        let millisecs = secs % 100
        let a = [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v,i) => v !== '00' || i > 1)
            .join(':');
        let s = a + "." + ("" + millisecs).padStart(2, 0)
        if (s.charAt(0) === '0') {
            return s.substr(1);
        }   
        return s
    }

    deleteTime(index) {
        this.props.deleteCallback(index);
    }

    plusTwo(index) {
        this.props.plusTwoCallback(index);
    }

    dnf(index) {
        this.props.dnfCallback(index);
    }

    render() {
        return (
            <div id='time-data-container'>
                <div id='timeListContainer'>
                    {this.props.solveTimes.length === 0 ? (
                        <div>There are no solves</div>
                    ):(<div></div>)}

                    {this.props.solveTimes.map((item, index) => (
                        <div key={index} className={'timeSlot' + (index + this.props.solveTimes.length) % 2}>
                            <div className='solveNum'>{this.props.solveTimes.length - index}</div>
                            <div className='solveTime'>{item.dnf ? "DNF" : this.formatTime(item.time)}</div>
                            <div className={'plusTwo-' + item.plusTwo} onClick={this.plusTwo.bind(this, index)}>+2</div>
                            <div className={'dnf-' + item.dnf} onClick={this.dnf.bind(this, index)}>DNF</div>
                            <div className='xButton' onClick={this.deleteTime.bind(this, index)}>x</div>
                        </div>
                    ))}
                </div>
                
                <div id='meta-data'>
                    <div className='meta-datum'>
                        average of 5: {this.formatTime(this.props.currAvg5)}
                    </div>

                    <div className='meta-datum'>
                        average of 12: {this.formatTime(this.props.currAvg12)}
                    </div>

                    <div className='meta-datum'>
                        mean of 100: {this.formatTime(this.props.currMean100)}
                    </div>

                    <div className='meta-datum'>
                        <br></br>
                        best avg of 5: {this.formatTime(this.props.bestAvg5)}
                    </div>

                    <div className='meta-datum'>
                        best avg of 12: {this.formatTime(this.props.bestAvg12)}
                    </div>

                    <div className='meta-datum'>
                        best mean of 100: {this.formatTime(this.props.bestMean100)}
                    </div>
                </div>
            </div>
        )
    }

}