/**
 * Created by zenymax on 2/2/18.
 */

var moment = require('moment');
var config = require('./config/default.json');

var poolBitfinex = [{
  handShakeSuccess: 0,
  symbol: 'default',
  count: 0,
  data: []
}]

var bearBot = [{
  symbol: 'default',
  down: 0
}]

var bullBot = [{
  symbol: 'default',
  up: 0
}]

function bearAdd(symbol) {
  for (var i=0;i<bearBot.length;i++) {
    if (symbol === bearBot[i].symbol) {
      bearBot[i].down += 1
      break
    } else if (i === bearBot.length - 1) {
      bearBot.push({
        symbol: symbol,
        down: 1
      })
      break
    }
  }
}

function bearGet(symbol) {
  for (var i=0;i<bearBot.length;i++) {
    if (symbol === bearBot[i].symbol) {
      return bearBot[i]
    }
  }
  return -1
}

function bullAdd(symbol) {
  for (var i=0;i<bullBot.length;i++) {
    if (symbol === bullBot[i].symbol) {
      bullBot[i].up += 1
      break
    } else if (i === bullBot.length - 1) {
      bullBot.push({
        symbol: symbol,
        up: 1
      })
      break
    }
  }
}

function bullGet(symbol) {
  for (var i=0;i<bullBot.length;i++) {
    if (symbol === bullBot[i].symbol) {
      return bullBot[i]
    }
  }
  return -1
}

var bearData = 0
var bullData = 0

// Function to subscribe to stream, transform data and publish to Redis from BITFINEX
function processBITFINEX(app, exchangeName, exchangeWSS, exchangeSymbol, totalPair, countHandshake) {
  const WebSocket = require('ws');
  const wss = new WebSocket(exchangeWSS);

  console.log('processBITFINEX websocket is connected!!!');

  // Open connection once one is established
  wss.onopen = () => {
    // Send request to subscribe
    wss.send(JSON.stringify(
      {
        "event": "subscribe",
        "channel": "trades",
        "pair": exchangeSymbol
      }
    ));
    poolBitfinex = [{
      symbol: 'default',
      count: 0,
      data: []
    }]
    countHandshake(exchangeName, exchangeSymbol, totalPair)
  };

  wss.onerror = (err) => {
    // console.log('Start Server Error: ', err.message);
    throw(err)
  }

  // Parse channel information and send to Redis
  wss.onmessage = (msg) => {
    var resp = JSON.parse(msg.data);
    var head = resp.event;
    // Get channel and symbol from response
    if ( head == "subscribed") {
      // console.log(" channelID = ", resp.chanId, " currency = ", resp.pair);
    } else {
      if ( resp[1] == "tu")
      {
        if (resp[6] > 0) {
          bullData += 1
        } else {
          bearData += 1
        }
        var data = {
          sum: bullData + bearData,
          bull: bullData,
          bear: bearData,
          bullP: (bullData/(bullData + bearData))*100,
          bearP: (bearData/(bullData + bearData))*100
        }
        var text = 'SUM: ' + data.sum + ' - Bear ' + data.bearP + '% - ' + data.bullP + '% Bull';
        console.log(text);
        app.get('Socket').emit('bullbear', data)
      }
    }
  };
}

module.exports = {
  processBITFINEX
}