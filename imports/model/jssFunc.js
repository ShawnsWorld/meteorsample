import jss from 'jss'
import camelCase from 'jss-camel-case'

jss.use(camelCase())

const jssFunc = {
  toPlainCss(css, className) {
    const sheet = className ? jss.createStyleSheet({className:css}) : jss.createStyleSheet({css});
    return sheet.toString({selector: className ? true : false});
  }
}
export default jssFunc;
