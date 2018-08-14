import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <div style={this.props.styles}></div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.zIndex = 0;
    }

    componentDidMount() {
        window.addEventListener('click', () => {this.renderSquare()});
    }

    componentWillUnmount() {
        window.removeEventListener('click', () => {this.renderSquare()});
    }

    setRandomProperties() {

        // if you want really random number - use Number.MAX_VALUE
        // const length = Math.random()*Number.MAX_VALUE + 'px';
        const length = Math.random()*1000 + 'px';
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        this.zIndex++;
        return {
            width: length,
            height: length,
            backgroundColor: color,
            zIndex: this.zIndex,
            position: "absolute",
            left: Math.random()*1000 + 'px',
            top: Math.random()*1000 + 'px'
        }
    }

    renderSquare() {
        const container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Square styles={this.setRandomProperties()}/>, container);
    }

    render() {
        return null;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);