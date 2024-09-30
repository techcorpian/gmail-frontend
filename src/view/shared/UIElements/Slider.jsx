import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './slider.css'; // Import custom CSS for transitions

const Slider = ({ children }) => {
    return (
        <TransitionGroup className="slider-container">
            <CSSTransition
                key={children.key}
                timeout={500}
                classNames="slide"
                unmountOnExit
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
};

export default Slider;
