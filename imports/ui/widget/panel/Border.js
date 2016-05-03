'use strict';
import React from 'react';
import Slider from '/imports/ui/common/Slider';
import {Checkbox, Tabs, Tab, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {SketchPicker} from 'react-color';

const borderStyles = [{style: 'dotted', width: '1px'},
    {style: 'dashed', width: '1px'},
    {style: 'solid', width: '1px'},
    {style: 'double', width: '4px'},
    {style: 'groove', width: '5px'},
    {style: 'ridge', width: '5px'},
    {style: 'inset', width: '5px'},
    {style: 'outset', width: '5px'}
];

function getBorders(keyPrefix) {
    return borderStyles.map((border)=><button key={border.style}
                                              style={{display:'inline-block',
                                              padding: '0 1em',
                                              marginRight:'1em',
                                              borderStyle: border.style,
                                              borderWidth: border.width,
                                              borderColor: 'black'}}>
        {border.style}
    </button>);
}

class Border extends React.Component {
    render() {
        return (
            <div className='border'>
                <p>
                    <Checkbox inline>
                        全部
                    </Checkbox>
                    {' '}
                    <Checkbox inline>
                        上边
                    </Checkbox>
                    {' '}
                    <Checkbox inline>
                        右边
                    </Checkbox>
                    {' '}
                    <Checkbox inline>
                        下边
                    </Checkbox>
                    {' '}
                    <Checkbox inline>
                        左边
                    </Checkbox>
                </p>
                <div className="prop-group">
                    <label for="exampleInputName2">宽度</label>
                    <Slider min={1} max={100}/>
                </div>
                <div className="prop-group">
                    <label for="exampleInputName2">形状</label>
                    {getBorders('')}
                </div>
                <div className="prop-group">
                    <label for="exampleInputName2">颜色</label>
                    <OverlayTrigger trigger='click' rootClose placement='left' overlay={
                        <Popover id='border-color-picker'>
                            <SketchPicker type='sketch' />
                        </Popover>
                    }>
                        <Button bsStyle='primary' bsSize='xsmall'
                                style={{background:'white'}}>颜色</Button>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}

Border.displayName = 'Border';

Border.propTypes = {}
export default Border;
