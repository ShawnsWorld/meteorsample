'use strict';
import React from 'react';
import {findDOMNode} from 'react-dom';
import Slider from '/imports/client/common/Slider';
import {borderRadiusFunc} from '/imports/model';

const sides = [
    {label: '全部', name: 'all'},
    {label: '左上角', name: 'topLeft'},
    {label: '右上角', name: 'topRight'},
    {label: '右下角', name: 'bottomRight'},
    {label: '左下角', name: 'bottomLeft'},
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

class BorderRadius extends React.Component {
    constructor(props) {
        super(props);
        this.onSideSelected = this.onSideSelected.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onUnitChanged = this.onUnitChanged.bind(this);
        this.onRatioChanged = this.onRatioChanged.bind(this);
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
    onUnitChanged(e) {
        if (typeof this.props.actions.onBorderRadiusChanged === 'function')
            this.props.actions.onBorderRadiusChanged(this.context.widgetId, this.props.status.selected, 'unit', e.target.value);
    }
    onValueChanged(value) {
        if (typeof this.props.actions.onBorderRadiusChanged === 'function')
            this.props.actions.onBorderRadiusChanged(this.context.widgetId, this.props.status.selected, 'value', value);
    }
    onRatioChanged(value) {
        if (typeof this.props.actions.onBorderRadiusChanged === 'function')
            this.props.actions.onBorderRadiusChanged(this.context.widgetId, this.props.status.selected, 'ratio', value);
    }
    render() {
        let side = 'all';
        if (_.indexOf(this.props.status.selected, 'all') < 0)
            side = this.props.status.selected[0] || 'all';
        let {ratio, unit, value} = this.props.styles;
        if (side !== 'all') {
            ratio = this.props.styles[side].ratio || ratio;
            unit = this.props.styles[side].unit || unit;
            value = this.props.styles[side].value || value;
        }
        let valueSlideProps = {
            min: 0,
            max: unit === '%' ? 50 : 240,
            value : value,
            onSlide: this.onValueChanged,
            indicatorLength: 5
        }
        return (
            <div className='border-radius'>
                <p>
                    {renderSides(this.props.status.selected, this.onSideSelected)}
                </p>
                <div className={this.props.status.selected.length == 0 ? 'disabled' : ''}>
                    <div className='prop-group'>
                        <label for='exampleInputName2'>单位</label>
                        <div>
                            <label className='ratio-inline'>
                                <input type='radio' checked={unit === 'px'} name='unit' value={'px'} onChange={this.onUnitChanged}/>
                                像素(px)
                            </label>
                            {' '}
                            <label className='ratio-inline'>
                                <input type='radio' checked={unit === '%'} name='unit' value={'%'} onChange={this.onUnitChanged}/>
                                百分比(%)
                            </label>
                        </div>
                    </div>
                    <div className='prop-group'>
                        <label for='exampleInputName2'>X半径</label>
                        <Slider {...valueSlideProps}/>
                    </div>
                    <div className='prop-group'>
                        <label for='exampleInputName2'>X:Y</label>
                        <Slider min={-9} max={9} value={ratio} onSlide={this.onRatioChanged} indicatorLength={5} decorateValue={borderRadiusFunc.convertRatioToString}/>
                    </div>
                </div>
            </div>
        );
    }
}

BorderRadius.displayName = 'BorderRadius';

BorderRadius.contextTypes = {
    widgetId: React.PropTypes.string
};

export default BorderRadius;
