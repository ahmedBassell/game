import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map.jsx';
import Player from './player.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
	    return (
	    	<div>
	    		<Map />
	    		<Player />
	    	</div>
	    );
	}
}