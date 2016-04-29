import React, {
    Component
} from 'react';

export default class Widgets extends Component {
    render() {
        return (
            <div className="widgets list-group">
                <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">小组件</h4>
                    <p className="list-group-item-text">
                        <span className='badge'>徽章</span>
                        <span className='label label-primary'>标签</span>
                    </p>
                </a>
            </div>

        );
    }
}
