import React, {Component, PropTypes} from 'react';
import Widgets from '../common/Widgets';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { EditingWidgets } from '../../api/editingWidgets';

import actions from './actions';
import defaultProps from './DefaultProps';
import CanvasBackground from './CanvasBackground';
import Canvas from './Canvas';
import Panel from './Panel';


class Widget extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(props) {
    }
    render() {
        console.log(this.props.editingWidget)
        if (this.props.editingWidget == null)
            return (<div className='widget'/>);

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
                            <Panel actions={actions} editingWidget={this.props.editingWidget}/>
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
                let existing = EditingWidgets.findOne({userId: Meteor.userId()});
                if (existing == null) {
                    let result= Meteor.call('editingWidgets.save', defaultProps);
                }
            }
        });
    }
    let a = EditingWidgets.find({userId: Meteor.userId()}).fetch();
    console.log(a)
    return {
        editingWidget: EditingWidgets.find({userId: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };
}, Widget);
