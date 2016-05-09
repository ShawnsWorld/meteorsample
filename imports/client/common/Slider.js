import React from 'react';
import {findDOMNode} from 'react-dom';
// import Powerange from 'powerange';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getIndicatorValue = this.getIndicatorValue.bind(this);
        this.state = {value: this.props.value ? this.props.value : this.props.min};
    }
    onChange() {
        let value = parseInt(findDOMNode(this.refs.range).value);
        if (typeof this.props.onSlide === 'function')
            this.props.onSlide(value);
    }
    getIndicatorValue() {
        if (typeof this.props.decorateValue === 'function')
            return this.props.decorateValue(this.props.value);
        return this.props.value;
    }
    render() {
        let current = this.props.value;
        let currentPositon = (current - this.props.min) / (this.props.max - this.props.min);
        let indicatorValue = this.getIndicatorValue();
        let indicatorLength = this.props.indicatorLength || indicatorValue.toString().length;
        return (
            <div className='slider'>
                <div className='main' style={{width: 'calc(100% - ' + indicatorLength + 'em)'}}>
                    <input ref='range' className='bar' type='range' onChange={this.onChange} {...this.props} />
                    <span className='highlight'></span>
                </div>
                <div className='indicator' style={{width : (indicatorValue.toString().length) + 'em'}}>{indicatorValue}</div>
            </div>
        )
    }
}
