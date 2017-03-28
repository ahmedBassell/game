import React from 'react';
import Map from './map.jsx';
import Player from './player.jsx';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Map/>
                <Player/>
            </div>
        );
    }
}
