import React, {Component, PropTypes} from 'react';
import {Checkbox} from 'react-bootstrap';
import Switch from '/imports/client/common/Switch';
import General from './panel/General';
import Border from './panel/Border';
import BorderRadius from './panel/BorderRadius';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.getChildContext = this.getChildContext.bind(this);
        this.onActivePanelChanged = this.onActivePanelChanged.bind(this);
    }
    getChildContext() {
        return {widgetId: this.props.editingWidget._id};
    }
    onActivePanelChanged(e, panel) {
        e.stopPropagation();
        this.props.actions.onActivePanelChanged(this.props.editingWidget._id, panel);
    }
    render() {
        let {panelStatus, styles} = this.props.editingWidget;
        let content;

        switch(panelStatus.active) {
            case 'general':
                content = <General status={panelStatus.general} styles={styles} actions={this.props.actions.border}/>
                break;
            case 'border':
                content = <Border status={panelStatus.border} styles={styles.border} actions={this.props.actions.border}/>
                break;
            case 'borderRadius':
                content = <BorderRadius status={panelStatus.borderRadius} styles={styles.borderRadius} actions={this.props.actions.borderRadius}/>
                break;
            default:
        }
        return (
            <div className='prop-panel'>
                <div className='menu'>
                    <div className='list-group'>
                        <div className={'list-group-item' + (panelStatus.active === 'general' ? ' active' : '')}
                             onClick={(e)=>{this.onActivePanelChanged(e, 'general')}}>
                            <div className='menu-item'>
                                <div className='title'>
                                    大小
                                </div>
                                <div className='switch pull-right'><Switch/></div>
                            </div>
                        </div>
                        <div className={'list-group-item' + (panelStatus.active === 'border' ? ' active' : '')}
                             onClick={(e)=>{this.onActivePanelChanged(e, 'border')}}>
                            <div className='menu-item'>
                                <div className='title'>
                                    边框
                                </div>
                                <div className='switch pull-right'><Switch/></div>
                            </div>
                        </div>
                        <div className={'list-group-item' + (panelStatus.active === 'borderRadius' ? ' active' : '')}
                            onClick={(e)=>{this.onActivePanelChanged(e, 'borderRadius')}}>
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
                    {content}
                </div>
            </div>
        )
    }
}
Panel.childContextTypes = {
    widgetId: React.PropTypes.string
};

export default Panel;
