'use strict';
import React from 'react';
import {findDOMNode} from 'react-dom';
import Slider from '/imports/client/common/Slider';
import {Checkbox, Tabs, Tab, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {SketchPicker} from 'react-color';
import tinycolor from 'tinycolor2';

const sides = [
    {label: '全部', name: 'all'},
    {label: '上边', name: 'top'},
    {label: '右边', name: 'right'},
    {label: '下边', name: 'bottom'},
    {label: '左边', name: 'left'},
];

function renderSides(selected, onSideSelected) {
    return sides.map((side) => {
        let checked = side === 'all' ? selected.length === 4 : _.indexOf(selected, side.name) > -1;
        return (
            <label key={side.name} className='checkbox-inline'>
                <input type='checkbox' value={side.name} ref={side.name}
                       checked={checked} onChange={onSideSelected}/>
                {side.label}
            </label>
        )
    });
}

class General extends React.Component {
    constructor(props) {
        super(props);
        this.onSideSelected = this.onSideSelected.bind(this);
        this.onWidthChanged = this.onWidthChanged.bind(this);
        this.onStyleChanged = this.onStyleChanged.bind(this);
        this.onColorChanged = this.onColorChanged.bind(this);
    }
    onSideSelected(e) {
        if (e.target.checked) {
            if (typeof this.props.actions.onSideSelected === 'function')
                this.props.actions.onSideSelected(this.context.widgetId, e.target.value);
        } else {
            if (typeof this.props.actions.onSideUnSelected === 'function')
                this.props.actions.onSideUnSelected(this.context.widgetId, e.target.value);
        }
    }
    onWidthChanged(value) {
        if (typeof this.props.actions.onBorderChanged === 'function')
            this.props.actions.onBorderChanged(this.context.widgetId, this.props.status.selected, 'width', value);
    }
    onStyleChanged(value) {
        if (typeof this.props.actions.onBorderChanged === 'function')
            this.props.actions.onBorderChanged(this.context.widgetId, this.props.status.selected, 'style', value);
    }
    onColorChanged(value) {
        if (typeof this.props.actions.onBorderChanged === 'function')
            this.props.actions.onBorderChanged(this.context.widgetId, this.props.status.selected, 'color', tinycolor(value.rgb).toRgbString());
    }
    render() {
        let side = 'all';
        if (_.indexOf(this.props.status.selected, 'all') < 0)
            side = this.props.status.selected[0] || 'all';
        let {width, style, color} = this.props.styles;
        if (side !== 'all') {
            width = this.props.width || 0;
            style = this.props.styles[side].style || style;
            color = this.props.styles[side].color || 'rgb(0,0,0,0)';
        }
        return (
            <div className='border'>
                <p>
                    {renderSides(this.props.status.selected, this.onSideSelected)}
                </p>
                <div className={this.props.status.selected.length == 0 ? 'disabled' : ''}>
                    <div className='prop-group'>
                        <label for='exampleInputName2'>宽度</label>
                        <Slider min={0} max={100} value={width} onSlide={this.onWidthChanged} indicatorLength={5}/>
                    </div>
                    <div className='prop-group'>
                        <label for='exampleInputName2'>颜色</label>
                        <OverlayTrigger trigger='click' rootClose placement='left' overlay={
                        <Popover id='border-color-picker'>
                            <SketchPicker color={tinycolor(color).toRgb()} type='sketch' onChangeComplete={this.onColorChanged}/>
                        </Popover>
                    }>
                            <Button bsStyle='primary' bsSize='xsmall'
                                    style={{background:color}}>颜色</Button>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
        );
    }
}

General.displayName = 'General';

General.contextTypes = {
    widgetId: React.PropTypes.string
};

export default General;
