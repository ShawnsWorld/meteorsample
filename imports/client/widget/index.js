import React, {Component, PropTypes} from 'react';
import Widgets from '../common/Widgets';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { EditingWidgets } from '/imports/api/editingWidgets';

import actions from './actions';
import DefaultWidget from './DefaultWidget';
import CanvasBackground from './CanvasBackground';
import Canvas from './Canvas';
import Panel from './Panel';

class Widget extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.editingWidgets == null || this.props.editingWidgets.length == 0)
            return (<div className='widget'/>);

        let editingWidget = this.props.editingWidgets[0];
        let {panelStatus, styles} = editingWidget;
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
                            <Panel actions={actions} editingWidget={editingWidget}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    let editingWidget;
    if (Meteor.user()) {
        Meteor.subscribe('editingWidget', {
            onReady(){
                let existing = EditingWidgets.findOne({owner: Meteor.userId()});
                if (existing == null) {
                    let result= Meteor.call('editingWidgets.create', DefaultWidget);
                }
            }
        });
    }
    return {
        editingWidgets: EditingWidgets.find({owner: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };
}, Widget);
