import React from 'react';
import ReactDOM from 'react-dom';

export default class Player extends React.Component {
  	constructor(props) {
		super(props);
		this.updateDimensions = this.updateDimensions.bind(this)
		this.moveUp = this.moveUp.bind(this)
		this.moveDown = this.moveDown.bind(this)
		this.moveRight = this.moveRight.bind(this)
		this.moveLeft = this.moveLeft.bind(this)
		this.moveUpLeft = this.moveUpLeft.bind(this)
		this.width = 50;
		this.height = 50;
		this.padding = 0;
		this.state = {x: 0, y: 0};
  	}

  	componentDidMount() {
  		window.addEventListener('resize', this.updateDimensions);
	  	Mousetrap.bind('up', this.moveUp);
	  	Mousetrap.bind('down', this.moveDown);
	  	Mousetrap.bind('right', this.moveRight);
	  	Mousetrap.bind('left', this.moveLeft);
	  	Mousetrap.bind('left+up', this.moveUpLeft);
  		this.updateDimensions();
  	}

  	updateDimensions() {
  		this.setState({x: (window.innerWidth - this.width)/2, y: (window.innerHeight - this.height)/2});
  	}

	moveUp() {
  		this.setState((prevState, props) => ({
			y: prevState.y - 5
		}));
	}

	moveDown() {
  		this.setState((prevState, props) => ({
			y: prevState.y + 5
		}));
	}

	moveRight() {
  		this.setState((prevState, props) => ({
			x: prevState.x + 5
		}));
  	}

  	moveLeft() {
  		this.setState((prevState, props) => ({
			x: prevState.x - 5
		}));
  	}

  	moveUpLeft() {
  		this.setState((prevState, props) => ({
			x: prevState.x - 5,
			y: prevState.y - 5
		}));
  	}

	render() {
	    return (
	    	<div
	    	className="player"
	    	style={{top: this.state.y, left: this.state.x}}
	    	ref="player"
	    	tabIndex="0">
	    	</div>
	    );
	}
}