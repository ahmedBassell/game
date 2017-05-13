import React from 'react';
import Mousetrap from 'mousetrap';

const io = require('socket.io-client');
const socket = io('/');

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.width = 5000;
        this.height = 5000;
        this.padding = 0;
        this.state = {
            x: 0,
            y: 0
        };
    }

    componentDidMount() {
        this.drawBoard();
        Mousetrap.bind('up', this.moveUp);
        Mousetrap.bind('down', this.moveDown);
        Mousetrap.bind('right', this.moveRight);
        Mousetrap.bind('left', this.moveLeft);
        socket.on(`movement`, data => {
          console.log(data);
        })
    }

    moveUp() {
        this.setState((prevState, props) => ({
            y: prevState.y + 5
        }));
        socket.emit('movement', {'direction': 'up'});
    }

    moveDown() {
        this.setState((prevState, props) => ({
            y: prevState.y - 5
        }));
        socket.emit('movement', {'direction': 'down'});
    }

    moveRight() {
        this.setState((prevState, props) => ({
            x: prevState.x - 5
        }));
        socket.emit('movement', {'direction': 'right'});
    }

    moveLeft() {
        this.setState((prevState, props) => ({
            x: prevState.x + 5
        }));
        socket.emit('movement', {'direction': 'left'});
    }

    drawBoard() {
        const ctx = this.refs.canvas.getContext("2d");
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;
        for (let x = 0; x <= this.width; x += 40) {
            ctx.moveTo(0.5 + x + this.padding, this.padding);
            ctx.lineTo(0.5 + x + this.padding, this.height + this.padding);
        }

        for (let x = 0; x <= this.height; x += 40) {
            ctx.moveTo(this.padding, 0.5 + x + this.padding);
            ctx.lineTo(this.width + this.padding, 0.5 + x + this.padding);
        }

        ctx.strokeStyle = '#f2f2f2';
        ctx.stroke()
    }

    render() {
        return (
            <div>
                <canvas className="map" style={{
                    marginTop: this.state.y,
                    marginLeft: this.state.x
                }} ref="canvas" tabIndex="0"></canvas>
            </div>
        );
    }
}
