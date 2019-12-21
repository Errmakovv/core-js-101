/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  const values = Object.values(obj);
  return new proto.constructor(...values);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  cssSelector: '',
  el: 0,
  idi: 0,
  pe: 0,
  array: [false, false, false, false, false, false],

  element(value) {
    if (this.el === 1) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    if (this.array.indexOf(true) > 0) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    const copy = { ...this };
    copy.el = 1;
    copy.array = this.array.slice();
    copy.array[0] = true;
    copy.cssSelector += value;
    return copy;
  },

  id(value) {
    if (this.idi === 1) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    if (this.array.indexOf(true) > 1) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    const copy = { ...this };
    copy.idi = 1;
    copy.array = this.array.slice();
    copy.array[1] = true;
    copy.cssSelector += `#${value}`;
    return copy;
  },

  class(value) {
    if (this.array.indexOf(true) > 2) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    const copy = { ...this };
    copy.array = this.array.slice();
    copy.array[2] = true;
    copy.cssSelector += `.${value}`;
    return copy;
  },

  attr(value) {
    if (this.array.indexOf(true) > 3) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    const copy = { ...this };
    copy.array = this.array.slice();
    copy.array[3] = true;
    copy.cssSelector += `[${value}]`;
    return copy;
  },

  pseudoClass(value) {
    if (this.array.indexOf(true) > 4) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    const copy = { ...this };
    copy.array = this.array.slice();
    copy.array[4] = true;
    copy.cssSelector += `:${value}`;
    return copy;
  },

  pseudoElement(value) {
    if (this.pe === 1) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    const copy = { ...this };
    copy.pe = 1;
    copy.array = this.array.slice();
    copy.array[5] = true;
    copy.cssSelector += `::${value}`;
    return copy;
  },

  combine(selector1, combinator, selector2) {
    const copy = { ...this };
    copy.cssSelector = `${selector1.cssSelector} ${combinator} ${selector2.cssSelector}`;
    copy.array = this.array.slice();
    return copy;
  },

  stringify() {
    return this.cssSelector;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
