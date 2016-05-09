'use strict';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {borderFunc, borderRadiusFunc, jssFunc} from '/imports/model'
import MediumEditor from 'medium-editor';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

function replaceBorderRadius(styles) {
    let borderRadius = borderRadiusFunc.process(styles.borderRadius);
    return Object.assign({}, styles, borderRadius);
}
function replaceBorder(styles) {
    let border = borderFunc.process(styles.border);
    return Object.assign({}, styles, border);
}

class Canvas extends React.Component {
    constructor(props){
        super(props)
        this.setStyle = this.setStyle.bind(this);
    }
    componentDidMount() {
        var editor = new MediumEditor(findDOMNode(this.refs.target));
        this.setState({editor: editor});
        this.setStyle();
    }
    componentDidUpdate() {
        this.setStyle();
    }
    setStyle() {
        let styles = replaceBorderRadius(this.props.styles);
        styles = replaceBorder(styles);
        let css = jssFunc.toPlainCss(styles);
        findDOMNode(this.refs.target).setAttribute('style', css);
    }
    render() {
        return (
            <div className="editor-canvas" ref='target'>
                <h3>标题</h3>
                <p>
                    内容
                    内容
                </p>
            </div>
        );
    }
}

Canvas.displayName = 'Canvas';

export default Canvas;
