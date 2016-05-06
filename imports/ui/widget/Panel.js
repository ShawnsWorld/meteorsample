import React, {Component, PropTypes} from 'react';
import {Checkbox} from 'react-bootstrap';
import Switch from '/imports/ui/common/Switch';
import Border from './panel/Border';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.getChildContext = this.getChildContext.bind(this);
    }
    getChildContext() {
        return {widgetId: this.props.editingWidget._id};
    }
    render() {
        let {panelStatus, styles} = this.props.editingWidget;
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
                    <Border status={panelStatus.border} styles={styles.border} actions={this.props.actions.border}/>
                </div>
            </div>
        )
    }
}
Panel.childContextTypes = {
    widgetId: React.PropTypes.string
};

export default Panel;
