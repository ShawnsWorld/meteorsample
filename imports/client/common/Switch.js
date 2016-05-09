import React, {Component, PropTypes} from 'react';

import 'css-toggle-switch/dist/toggle-switch.css'

export default class Switch extends Component {
    render() {
        return (
            <label className="switch-light switch-material">
                <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange}/>
                  <span>
                    <span>Off</span>
                    <span>On</span>
                    <a></a>
                  </span>
            </label>
        )
    }
}
