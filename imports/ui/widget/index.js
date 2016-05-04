import React, {Component, PropTypes} from 'react';
import Widgets from '../common/Widgets';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { EditingWidgets } from '../../api/editingWidgets';

import defaultProps from './DefaultProps';
import CanvasBackground from './CanvasBackground';
import Canvas from './Canvas';
import Panel from './Panel';


class Widget extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    componentWillReceiveProps(props) {
        console.log(props)
    }
    render() {
        let {panelStatus, styles} = this.props.editingWidget;
        return (
            <div className='widget'>
                <div className='container'>
                    <div className='col-sm-4 hidden-xs'>
                        <Widgets/>
                    </div>
                    <div className='col-xs-12 col-sm-8'>
                        <CanvasBackground style={{width:450, margin:'auto', padding:5}}>
                            <Canvas panelStatus={panelStatus} styles={styles}/>
                        </CanvasBackground>
                        <div className="well">
                            <Panel panelStatus={panelStatus} styles={styles}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('editingWidget');
    let editingWidget = EditingWidgets.findOne({userId: Meteor.userId()});
    return {
        editingWidget: editingWidget ? editingWidget : defaultProps,
        currentUser: Meteor.user()
    };
}, Widget);
