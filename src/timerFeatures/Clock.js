import React, {Component} from 'react';
import './Clock.css';
//import StackmatSignalProcessor from 'stackmat-signal-processor';

export default class Clock extends Component {
    constructor() {
        super();
        
        this.state = {
            seconds: 0,
            clockRunning: false,
            userScrambling: true,
            holding: false,
            lastKeyDown: new Date().getTime(),
            timerColor: "black"
        };
        this.timerStart = this.timerStart.bind(this);
        this.timerStop = this.timerStop.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    async connect() {
        /*
        // Connect to media device
        let stream = await navigator.mediaDevices.getUserMedia({
            "audio": {"optional": [{"echoCancellation": false}]}
        })
        
        // Get the Audio Context
        const audioContext = new AudioContext({
            "echoCancellation": false,
            "noiseSuppression": false
        })
        
        // Create relevant Audio Nodes
        const microphone = audioContext.createMediaStreamSource(stream)
        
        // Connecting the StackmatSignalProcessor
        await audioContext.audioWorklet.addModule(StackmatSignalProcessor)
        
        // Create an Audio Node for the Stackmat Signal Processor
        const stackmatSignal = new AudioWorkletNode(audioContext, 'StackmatSignalProcessor')
        
        microphone.connect(stackmatSignal)
        stackmatSignal.connect(audioContext.destination)
        
        stackmatSignal.port.onmessage = (event) => {
            //console.log(event.data)
            console.log("abcdefg")
        }*/
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    timerStart() {
        this.setState({
            seconds: 0,
            clockRunning: true
        })
        this.interval = setInterval(() => this.tick(), 10);
    }

    timerStop() {
        this.setState(state => ({
            seconds: state.seconds,
            clockRunning: false
        }))
        clearInterval(this.interval);
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyPress, false);
        document.addEventListener("keyup", this.handleKeyUp, false);
        this.connect();
    }

    componentWillUnmount() {
        this.timerStop();
        document.removeEventListener("keydown", this.handleKeyPress, false);
        document.removeEventListener("keyup", this.handleKeyUp, false);
    }

    formatTime(secs) {
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

    handleKeyPress(event) {
        if (!this.state.holding) {
            this.setState({lastKeyDown: new Date().getTime(), holding: true})
        }

        // key press when stopping timer
        if (this.state.clockRunning) {
            this.timerStop();
            this.setState({clockRunning: false})
            this.props.parentCallback({time: this.state.seconds, plusTwo: false, dnf: false});
        }
        
        // key press when starting timer
        else {
            this.setState({seconds: 0})
            let now = new Date().getTime();
            if (now > this.state.lastKeyDown + 100) {
                this.setState({timerColor: "green"})
            }
            else {
                this.setState({timerColor: "red"})
            }
        }
    }

    handleKeyUp(event) {
        // key up when starting timer
        if (this.state.userScrambling) {
            if (!this.state.clockRunning && this.state.timerColor === "green") {
                this.setState({holding: false, timerColor: "black"})
                this.timerStart();
                this.setState({userScrambling: false});
            }
        }

        // key up when stopping timer
        else {
            this.setState({userScrambling: true})
        }
        this.setState({holding: false, timerColor: "black"})
    }
  
    render() {
        return (
            <div id='clock' className={this.state.timerColor}>
                {this.formatTime(this.state.seconds)}
            </div>
        )
  }
}