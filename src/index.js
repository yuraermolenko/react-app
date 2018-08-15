import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <div className="square" style={this.props.styles}>{this.props.styles.zIndex}</div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfSquares: []
        }
    }

    componentDidMount() {
        window.addEventListener('click', () => {this.renderSquare()});
    }

    componentWillUnmount() {
        window.removeEventListener('click', () => {this.renderSquare()});
    }

    getRandomPalette() {
        const r = parseInt(this.randomInteger(0,255));
        const g = parseInt(this.randomInteger(0,255));
        const b = parseInt(this.randomInteger(0,255));
        return {
            backgroundColor: `rgba(${r}, ${b}, ${b})`,
            color: (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF'
        }
    }

    setRandomProperties() {
        const position = this.getRandomPositionWithoutOverlapping();
        const zIndex = this.state.arrayOfSquares.length + 1;
        const palette = this.getRandomPalette();
        return {
            width: position.length,
            height: position.length,
            backgroundColor: palette.backgroundColor,
            fontSize: position.length,
            color: palette.color,
            zIndex: zIndex,
            left: position.left + 'px',
            top: position.top + 'px'
        }
    }

    getRandomPositionWithoutOverlapping(fieldRange = 100) {
        //strange midnight function
        const top = this.randomInteger(0, fieldRange);
        const left = this.randomInteger(0, fieldRange);
        const length = this.randomInteger(10, 100);
        for (let i = 0; i < this.state.arrayOfSquares.length; i++) {
            const square = this.state.arrayOfSquares[i];
            if (((top + length) > parseInt(square.top) && top < (parseInt(square.top) + parseInt(square.width))) && ((left + length) > parseInt(square.left) && left < (parseInt(square.left) + parseInt(square.width)))) {
                return this.getRandomPositionWithoutOverlapping(fieldRange + length);
            }
        }

        return {
            top: top,
            left: left,
            length: length
        }
    }

    randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    renderSquare() {
        if (this.state.arrayOfSquares.length >= 9) {
            this.setState((prevState) => {
                    prevState.arrayOfSquares.shift();
                    prevState.arrayOfSquares.push(this.setRandomProperties());
                    return {
                        arrayOfSquares: prevState.arrayOfSquares
                    }
                }
            );
        } else {
            this.setState((prevState) => ({
                arrayOfSquares: [...prevState.arrayOfSquares, this.setRandomProperties()]
            }));
        }
    }

    render() {
        return (
            <div>
                {this.state.arrayOfSquares.map((square, index) =>
                    <Square key={index}
                            styles={{...square, zIndex: index + 1}} />

                )}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);