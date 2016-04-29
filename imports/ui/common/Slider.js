import React from 'react';
import {findDOMNode} from 'react-dom';
// import Powerange from 'powerange';

export default class extends React.Component {
    componentDidMount() {
        // var elem = findDOMNode(this.refs.target);
        // var init = new Powerange(elem);
    }
    render() {
        return (
            <div className="slider">
                <input className="bar" type="range" id="rangeinput" defaultValue="50" onchange="rangevalue.value=value" />
                <span className="highlight"></span>
                <output className="rangevalue">50</output>
            </div>
        )
    }
}
