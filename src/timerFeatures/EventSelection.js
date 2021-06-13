import React, { Component } from 'react';
import './EventSelection.css';
import { NavLink } from "react-router-dom";
import two from '../cube_logos/2x2.png';
import three from '../cube_logos/3x3.png';
import four from '../cube_logos/4x4.png';
import five from '../cube_logos/5x5.png';
import six from '../cube_logos/6x6.png';
import seven from '../cube_logos/7x7.png';
import pyraminx from '../cube_logos/pyraminx.png';
import megaminx from '../cube_logos/megaminx.png';
import skewb from '../cube_logos/skewb.png';
import square1 from '../cube_logos/square1.png';

export default class EventSelection extends Component{
    constructor(props) {
        super(props);
        this.updateEventSelection = this.updateEventSelection.bind(this)
    }

    updateEventSelection(newEvent) {
        this.props.eventChangeCallback(newEvent);
    }

    render() {
        return (
            <div id="events">
                <NavLink to='/timer/2x2' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('222')}>
                    <img src={two} alt="2x2" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/3x3' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('333')}>
                    <img src={three} alt="3x3" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/4x4' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('444')}>
                    <img src={four} alt="4x4" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/5x5' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('555')}>
                    <img src={five} alt="5x5" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/6x6' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('666')}>
                    <img src={six} alt="6x6" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/7x7' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('777')}>
                    <img src={seven} alt="7x7" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/pyraminx' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('pyraminx')}>
                    <img src={pyraminx} alt="pyraminx" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/megaminx' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('megaminx')}>
                    <img src={megaminx} alt="megaminx" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/skewb' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('skewb')}>
                    <img src={skewb} alt="skewb" className="event-logo" />
                </NavLink>

                <NavLink to='/timer/square1' className='event-link' activeClassName='active-event' onClick={() => this.updateEventSelection('sq1')}>
                    <img src={square1} alt="square1" className="event-logo" />
                </NavLink>
            </div>
        );
    }
}