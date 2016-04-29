'use strict';
import React from 'react';
import Slider from '/imports/ui/common/Slider';


class Border extends React.Component {
    render() {
        return (
            <div className='border'>
                <Slider/>
            </div>
        );
    }
}

Border.displayName = 'Border';

Border.propTypes = {
}
export default Border;
