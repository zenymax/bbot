/**
 * Created by zenymax on 2/1/18.
 */


const request = require('request')
const url = 'https://api.bitfinex.com/v1'


// request.get( url + '/trades/btcusd?limit_trades=5',
//   function(error, response, body) {
//     console.log(body);
//   })


request.get(url + '/pubticker/btcusd',
  function(error, response, body) {
    console.log(body);
  })