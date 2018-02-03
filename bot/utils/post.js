var config = require('../config/config.js')
const crypto = require('crypto')
const request = require('request')
const url = config.apiVersion
const fullUrl = config.baseUrl + '/' + url
const apiKey = config.key.apiKey
const apiSecret = config.key.apiSecret

module.exports = function (path, params, cb) {
  var nonce = Date.now().toString()
  const body = {
    request: '/' + url + '/' + path,
    nonce
  }

  console.log('body: ', body);

  Object.keys(params).map(function(key, index) {
     body[key] = params[key];
  });

  const payload = new Buffer(JSON.stringify(body))
  	.toString('base64')

  console.log('payload: ', payload);
  const signature = crypto
    .createHmac('sha384', apiSecret)
    .update(payload)
    .digest('hex')

  var completeURL = fullUrl + '/' + path
  console.log('completeURL: ', completeURL);
  var options = {
    url: completeURL,
    headers: {
      'X-BFX-APIKEY': apiKey,
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: JSON.stringify(body)
  }
  request.post(
    options, cb
  )
}
