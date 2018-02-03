var action = require('../action/actions.js')
var API = {};

API.accountInfos = function(req, res) {
 action.accountInfos({}, (error, response, body) => {
   console.log(body);
   if(error) return res.send(error);
   return res.send(body);
 });
 res.write('accountInfos');
}

API.marginInfos = function(req, res) {
 action.marginInfos({}, (error, response, body) => {
   console.log('body: ', body);
   if(error) return res.send(error);
   return res.send(body);
 })
}

//orders
API.ordersHist = function(req, res) {
 action.ordersHist({}, (error, response, body) => {
   console.log('body: ', body);
   if(error) return res.send(error);
   return res.send(body);
 })
}

API.orderMarginNew = function(req, res) {
  console.log("req.body: ", req.body);
  var data = {
    symbol: req.body.symbol,
    amount: req.body.amount,
    price: req.body.price,
    side: req.body.side,
    type: req.body.type
  }
 action.orderMarginNew(data, (error, response, body) => {
   console.log('error: ', error);
   console.log('body: ', body);
   if(error) return res.send(error);
   return res.send(body);
 })
}

API.orderMarginCancel = function(req, res) {
  console.log("req.body: ", req.body);
  var data = {
    order_id: req.body.order_id
  }
 action.orderMarginCancel(data, (error, response, body) => {
   console.log('error: ', error);
   console.log('body: ', body);
   if(error) return res.send(error);
   return res.send(body);
 })
}

API.orderStatus = function(req, res) {
  console.log("req.body: ", req.body);
  var data = {
    order_id: req.body.order_id
  }
  action.orderStatus(data, (error, response, body) => {
    console.log('error: ', error);
    console.log('body: ', body);
    if(error) return res.send(error);
    return res.send(body);
 })
}

API.positions = function(req, res) {
  console.log("req.body: ", req.body);
  var data = {}
  action.positions(data, (error, response, body) => {
    console.log('error: ', error);
    console.log('body: ', body);
    if(error) return res.send(error);
    return res.send(body);
 })
}

API.positionClose = function(req, res) {
  console.log("req.body: ", req.body);
  var data = {
    position_id: req.body.position_id
  }
  action.positionClose(data, (error, response, body) => {
    console.log('error: ', error);
    console.log('body: ', body);
    if(error) return res.send(error);
    return res.send(body);
 })
}

module.exports = API
