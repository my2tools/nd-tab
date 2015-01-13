/**
 * Description: index.js
 * Author: lzhengms <lzhengms@gmail.com>
 * Date: 2015-01-13 15:32:52
 */

'use strict';

var Tab;
var $ = require('jquery');

function parseElement(element,parents){
  return parents.length?$(element, parents):$(element);
}

Tab = function (options) {
  return this.init(options);
};
/**
 *
 * @param options
 * options.itemTab  表示要切换的子标签   例如'.tab'
 * options.tabs  表示要切换的标签的父标签 例如'.tabs'
 * options.itemPanel 表示标签对应的子panel   例如'.panel'
 * options.panels 表示标签对应的父panels 例如'.panels'
 * options.initIndex 表示初始化选中某个标签的索引 例如0
 * @returns {Tab}
 */
Tab.prototype.init = function (options) {
  this.element = options.itemTab;
  this.tabs = $(options.tabs);
  this.panel = options.itemPanel;
  this.panels = $(options.panels);
  this.initIndex = +options.initIndex||0;//初始化索引
  this.bindEvent();
  this._onChangeIndex(this.initIndex);
  return this;
};
Tab.prototype.bindEvent = function () {
  var self = this;
  $(document).on('click', this.element, function (e) {
    var currentLi = $(e.target).closest(self.element);
    var index =parseElement(self.element,self.tabs).index(currentLi);
    if (index !== self.currentIndex) {
      self._onChangeIndex(index, self.currentIndex);
    }
    self.currentIndex = index;
  });
};
Tab.prototype._onChangeIndex = function (now) {
    var nowTab = parseElement(this.element,this.tabs).eq(now);
    var nowPanel = parseElement(this.panel,this.panels).eq(now);
    if(nowTab&&nowPanel){
      nowTab.siblings().removeClass('active');
      nowTab.addClass('active');
      nowPanel.show();
      nowPanel.siblings().hide();
    }
};


module.exports = Tab;