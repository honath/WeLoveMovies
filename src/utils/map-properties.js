const lodash = require("lodash");

/* -------------------------------------------------
*   Accepts config parameter object
*   object key specifies original property name
*   object value specifies new property name 
*   . is path delimiter in object values
* ------------------------------------------------ */
function mapProperties(configuration) {
  return (data) => {
    if (data) {
      return Object.entries(data).reduce((accumulator, [key, value]) => {
        return lodash.set(accumulator, configuration[key] || key, value);
      }, {});
    }
    return data;
  };
}

module.exports = mapProperties;
