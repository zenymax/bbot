var utils = require('../utils/utils.js')
var actions = {}

actions.accountInfos = function (data, cb) {
  var cb = cb || function () {}
  var data = data || {}
  utils.post('account_infos', data, cb);
}

actions.marginInfos = function (data, cb) {
  var cb = cb || function () {}
  utils.post('margin_infos', data, cb);
}

actions.ordersHist = function (data, cb) {
  var cb = cb || function () {}
  utils.post('orders/hist', data, cb);
}

actions.orderMarginNew = function (data, cb) {
  cb = cb || function () {}
  data = data || {}
  var params = {
    symbol: data.symbol,
    amount: data.amount,
    price: data.price,
    exchange: null,
    side: data.side,
    type: data.type
  }
  utils.post('order/new', params, cb);
}

actions.orderMarginCancel = function (data, cb) {
  cb = cb || function () {}
  data = data || {}
  var params = {
    order_id: data.order_id
  }
  utils.post('order/cancel', params, cb);
}

actions.orderStatus = function (data, cb) {
  cb = cb || function () {}
  data = data || {}
  var params = {
    order_id: data.order_id
  }
  console.log('utils: ', utils);
  utils.post('order/status', params, cb);
}

// positions
actions.positions = function (data, cb) {
  cb = cb || function () {}
  data = data || {}
  var params = {
  }
  utils.post('positions', params, cb);
}

actions.positionClose = function (data, cb) {
  cb = cb || function () {}
  data = data || {}
  var params = {
    position_id: data.position_id
  }
  console.log('params: ', params);
  utils.post('position/close', params, cb);
}

module.exports = actions
