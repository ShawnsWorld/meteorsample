'use strict';
import _ from 'lodash';
import React from 'react';
import Slider from '/imports/ui/common/Slider';
import { SketchPicker }  from 'react-color';
import {borderFunc, jssFunc} from 'model';
import tinycolor from 'tinycolor2';

const borderStyles = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
function getBorders(keyPrefix) {
    return borderStyles.map((name)=><MenuItem key={keyPrefix + name} eventKey={name}>
        <div style={{display: 'inline-block', width: '5em'}}>{name}</div>
        <div style={{display: 'inline-block', width: '5em', height: '1em', border: name + ' 3px black'}}></div>
    </MenuItem>);
}

class BorderSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showColorPicker: false};
        this.onColorSelected = this.onColorSelected.bind(this);
        this.onWidthSelected = this.onWidthSelected.bind(this);
        this.onStyleSelected = this.onStyleSelected.bind(this);
    }
    onColorSelected(color) {
        this.props.actions.setBorder(color.rgb, 'color', this.props.side);
    }
    onWidthSelected(values) {
        this.props.actions.setBorder(parseInt(values[0]), 'width', this.props.side);
    }
    onStyleSelected(e, style) {
        this.props.actions.setBorder(style, 'style', this.props.side);
    }
    render() {
        let border = this.props.editorPanel.styles.border;
        let side = this.props.side;
        let {width, color} = _.merge({}, border, border[side]);
        let colorRgb = tinycolor(color).toRgbString();
        return (
            <div className={'row border-settings' + side}>
                <div className='col-xs-8'>
                    <Slider
                        range={{min: 0, max: 100}}
                        start={[width]}
                        step={1}
                        connect='lower'
                        style={{background:colorRgb}}
                        onUpdate={(values)=>this.props.updateIndicatorRef().innerHTML=parseInt(values[0])}
                        onChange={this.onWidthSelected}
                    />
                </div>
                <div className='col-xs-4'>
                    <DropdownButton bsStyle={'primary'} bsSize='xsmall' title={'样式'} id='border-style-selector'
                                    onSelect={this.onStyleSelected}>
                        {getBorders('')}
                    </DropdownButton>
                    <OverlayTrigger trigger='click' rootClose placement='left' overlay={
              <Popover id='border-color-picker'><SketchPicker
              color={ color }
              onChangeComplete={this.onColorSelected} type='sketch' /></Popover>
            }>
                        <Button bsStyle='primary' bsSize='xsmall'
                                style={{background:colorRgb}}>颜色</Button>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}

BorderSettings.propTypes = {
    actions: React.PropTypes.object.isRequired,
    'actions.setBorderColor': React.PropTypes.func,
    side: React.PropTypes.string,
    editorPanel: React.PropTypes.object.isRequired
}


class Border extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showColorPicker: false};
    }
    render() {
        let border = this.props.editorPanel.styles.border;
        let css = borderFunc.process(border);
        return (
            <div className='border'>
                <div className='result text-center'><pre>{jssFunc.toPlainCss(css)}</pre></div>

                <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title='所有边框'>
                        <div className='all'>
                            <label>宽度 <span ref='widthValue'></span></label>
                            <BorderSettings {...this.props} updateIndicatorRef={()=>this.refs.widthValue}/>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title='分别设置'>
                        <div className='border-separated'>
                            <label>上边 <span ref='topWidthValue'></span></label>
                            <BorderSettings side='top' {...this.props} updateIndicatorRef={()=>this.refs.topWidthValue}/>
                            <label>右边 <span ref='rightWidthValue'></span></label>
                            <BorderSettings side='right' {...this.props} updateIndicatorRef={()=>this.refs.rightWidthValue}/>
                            <label>下边 <span ref='bottomWidthValue'></span></label>
                            <BorderSettings side='bottom' {...this.props} updateIndicatorRef={()=>this.refs.bottomWidthValue}/>
                            <label>左边 <span ref='leftWidthValue'></span></label>
                            <BorderSettings side='left' {...this.props} updateIndicatorRef={()=>this.refs.leftWidthValue}/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

Border.displayName = 'Border';

Border.propTypes = {
    actions: React.PropTypes.object.isRequired,
    editorPanel: React.PropTypes.object.isRequired
}
export default Border;
