import React, {Component, PropTypes} from 'react';
import {Checkbox} from 'react-bootstrap';
import Switch from '/imports/ui/common/Switch';
import Border from './panel/Border';

export default class Panel extends Component {
    render() {
        return (
            <div className='prop-panel'>
                <div className='menu'>
                    <div className="list-group">
                        <div className="list-group-item active">
                            <div className='menu-item'>
                                <div className='title'>
                                    边框
                                </div>
                                <div className='switch'><Switch/></div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className='menu-item'>
                                <div className='title'>
                                    边角
                                </div>
                                <div className='switch'><Switch/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <Border panelStatus={this.props.panelStatus} styles={this.props.styles}/>
                </div>
            </div>
        )
    }
}
