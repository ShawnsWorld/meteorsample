'use strict';
import React from 'react';
import {findDOMNode} from 'react-dom';
import Slider from '/imports/ui/common/Slider';
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

const borderStyles = [{style: 'dotted', width: '1px'},
    {style: 'dashed', width: '1px'},
    {style: 'solid', width: '1px'},
    {style: 'double', width: '4px'},
    {style: 'groove', width: '5px'},
    {style: 'ridge', width: '5px'},
    {style: 'inset', width: '5px'},
    {style: 'outset', width: '5px'}
];

function renderBorderStyles(style, onStyleSelected, color) {
    return borderStyles.map((border)=><button className={border.style === style ? 'button btn-default active' : 'button btn-default'}
                                              disabled={border.style === style}
                                              key={border.style} value={border.style}
                                              style={{display:'inline-block',
                                              padding: '0 1em',
                                              marginRight:'1em',
                                              borderStyle: border.style,
                                              borderWidth: border.width,
                                              borderColor: color}} onClick={(e)=>{
                                                onStyleSelected(e.target.value);
                                              }}>
        {border.style}
    </button>);
}

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

class Border extends React.Component {
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
            width = this.props.styles[side].width || width;
            style = this.props.styles[side].style || style;
            color = this.props.styles[side].color || color;
        }
        return (
            <div className='border'>
                <p>
                    {renderSides(this.props.status.selected, this.onSideSelected)}
                </p>
                <div className={this.props.status.selected.length == 0 ? 'disabled' : ''}>
                    <div className='prop-group'>
                        <label for='exampleInputName2'>宽度</label>
                        <Slider min={1} max={100} value={width} onSlide={this.onWidthChanged}/>
                    </div>
                    <div className='prop-group'>
                        <label for='exampleInputName2'>形状</label>
                        {renderBorderStyles(style, this.onStyleChanged, color)}
                    </div>
                    <div className='prop-group'>
                        <label for='exampleInputName2'>颜色</label>
                        <OverlayTrigger trigger='click' rootClose placement='left' overlay={
                        <Popover id='border-color-picker'>
                            <SketchPicker color={tinycolor(color).toRgb()} type='sketch' onChangeComplete={this.onColorChanged}/>
                        </Popover>
                    }>
                            <Button bsStyle='primary' bsSize='xsmall'
                                    style={{background:'white'}}>颜色</Button>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
        );
    }
}

Border.displayName = 'Border';

Border.contextTypes = {
    widgetId: React.PropTypes.string
};

export default Border;
