var API = require('../api/api.js');
module.exports = function(app) {
  // general info
  app.get('/account_infos', (req, res) => API.accountInfos(req, res))

  app.get('/margin_infos', (req, res) => API.marginInfos(req, res))

  // orders
  app.get('/orders/hist', (req, res) => API.ordersHist(req, res))

  app.post('/order/new', (req, res) => API.orderMarginNew(req, res))

  app.post('/order/cancel', (req, res) => API.orderMarginCancel(req, res))

  app.post('/order/status', (req, res) => API.orderStatus(req, res))

  app.post('/positions', (req, res) => API.positions(req, res))

  app.post('/position/close', (req, res) => API.positionClose(req, res))
}
