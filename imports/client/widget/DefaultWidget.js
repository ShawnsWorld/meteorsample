'use strict';
const DefaultWidget = Object.freeze(
    {
        panelStatus: {
            active: 'border',
            general: {
                selected: ['all', 'top', 'right', 'bottom', 'left']
            },
            border: {
                selected: ['all', 'top', 'right', 'bottom', 'left']
            },
            borderRadius: {
                selected: ['all', 'topLeft', 'topRight', 'bottomRight', 'bottomLeft']
            }
        },
        styles: {
            border: {
                top: {
                    width: 1,
                    style: 'solid',
                    color: 'black'
                },
                right: {
                    width: 1,
                    style: 'solid',
                    color: 'black'
                },
                bottom: {
                    width: 1,
                    style: 'solid',
                    color: 'black'
                },
                left: {
                    width: 1,
                    style: 'solid',
                    color: 'black'
                },
                width: 1,
                style: 'solid',
                color: 'black'
            },
            borderRadius: {
                ratio: 1,
                unit: 'px',
                value: 10,
                topLeft: {
                    ratio: 0,
                    unit: 'px',
                    value: 10,
                },
                topRight: {
                    ratio: 0,
                    unit: 'px',
                    value: 10,
                },
                bottomRight: {
                    ratio: 0,
                    unit: 'px',
                    value: 10,
                },
                bottomLeft: {
                    ratio: 0,
                    unit: 'px',
                    value: 10,
                }
            },
            position: 'relative',
            padding: '5px'
        }
    }
);
export default DefaultWidget;
