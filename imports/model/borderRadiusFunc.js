import _ from 'lodash';
function toCssString({value, ratio, unit}, slash) {
  let x = value, y = _.round(value / borderRadiusFunc.convertRatioToDouble(ratio), 0);
  if (unit === '%') {
    x = x + '%';
    y = y + '%';
  } else {
    x += unit;
    y += unit;
  }
  return x + (slash ? ' / ' : ' ') + y;
}

function getValueRatioUnit(borderRadius, side) {
  let result;
  let values = {unit: borderRadius.unit, ratio: borderRadius.ratio, value: borderRadius.value};
  if (side) {
    if (borderRadius[side] == null)
      return;
    let sideValues = _.merge({}, values, borderRadius[side]);
    if (_.isEqual(sideValues, values))
      return;
    values = sideValues;
  }
  result = {};
  result[_.camelCase('border ' + (side ? side : '') + ' radius' )] = toCssString(values, side == null);
  return result;
}

const borderRadiusFunc = {
  process(borderRadius) {
    return Object.assign({}, getValueRatioUnit(borderRadius)
      , getValueRatioUnit(borderRadius, 'topLeft')
      , getValueRatioUnit(borderRadius, 'topRight')
      , getValueRatioUnit(borderRadius, 'bottomRight')
      , getValueRatioUnit(borderRadius, 'bottomLeft'))
  },
  toString(borderRadius) {
    let x = borderRadius.value, y = borderRadius.value / this.convertRatioToDouble(borderRadius.ratio);
    if (borderRadius.unit === '%') {
      x = x + '%';
      y = y + '%';
    } else {
      x += borderRadius.unit;
      y += borderRadius.unit;
    }
    return x + ' / ' + y;
  },
  convertRatioToString(ratio) {
    console.log(ratio + 1)
    if (ratio === 0)
      return '1:1';
    return ratio < 0 ? '1:' + (-ratio + 1): (ratio + 1) + ':1';
  },
  convertRatioToDouble(ratio) {
    if (ratio === 0)
      return 1;
    return ratio > 0 ? (ratio + 1) : 1/ (-(ratio) + 1);
  }
}


export default borderRadiusFunc;

