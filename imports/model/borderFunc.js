import _ from 'lodash';

function toCssString({width, style, color}) {
  return style + ' ' + width + 'px ' + color;
}

function getBorder(border, side) {
  let result;
  let values = {width: border.width, style: border.style, color: border.color};
  if (side) {
    if (border[side] == null)
      return;
    let sideValues = _.merge({}, values, border[side]);
    if (_.isEqual(sideValues, values))
      return;
    values = sideValues;
  }
  result = {};
  result[_.camelCase('border ' + (side ? side : ''))] = toCssString(values);
  return result;
}

const borderRadiusFunc = {
  process(border) {
    return Object.assign({}, getBorder(border)
      , getBorder(border, 'top')
      , getBorder(border, 'right')
      , getBorder(border, 'bottom')
      , getBorder(border, 'left'))
  }
}


export default borderRadiusFunc;

