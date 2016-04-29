import React, {Component, PropTypes} from 'react';
import Widgets from '../common/Widgets';

import defaultProps from './DefaultProps';
import CanvasBackground from './CanvasBackground';
import Canvas from './Canvas';
import Panel from './Panel';

export default class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = defaultProps;
    }

    render() {
        return (
            <div className='widget'>
                <div className='container'>
                    <div className='col-sm-4 hidden-xs'>
                        <Widgets/>
                    </div>
                    <div className='col-xs-12 col-sm-8'>
                        <CanvasBackground style={{width:450, margin:'auto', padding:5}}>
                            <Canvas panelStatus={this.state.panelStatus} styles={this.state.styles}/>
                        </CanvasBackground>
                        <div className="well">
                            <Panel panelStatus={this.state.panelStatus} styles={this.state.styles}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
