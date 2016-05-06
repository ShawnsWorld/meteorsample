import React from 'react';
import {findDOMNode} from 'react-dom';
// import Powerange from 'powerange';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {value: this.props.value ? this.props.value : this.props.min};
    }
    onChange() {
        let value = findDOMNode(this.refs.range).value;
        if (typeof this.props.onSlide === 'function')
            this.props.onSlide(value);
    }
    render() {
        let current = this.state.value;
        let currentPositon = (current - this.props.min) / (this.props.max - this.props.min);
        let indicatorLength = this.props.max.toString().length;
        return (
            <div className='slider'>
                <div className='main' style={{width: 'calc(100% - ' + indicatorLength + 'em)'}}>
                    <input ref='range' className='bar' type='range' onChange={this.onChange} {...this.props} />
                    <span className='highlight'></span>
                </div>
                <div className='indicator' style={{width : indicatorLength + 'em'}}>{this.state.value}</div>
            </div>
        )
    }
}
