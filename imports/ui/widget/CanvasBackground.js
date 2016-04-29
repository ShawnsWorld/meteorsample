'use strict';
import React from 'react';

class CanvasBackground extends React.Component {
    render() {
        return (
            <div className="canvas-background" {...this.props}>
                <div className="wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

CanvasBackground.displayName = 'CanvasBackground';

export default CanvasBackground;
