/**
 * Created by zenymax on 2/2/18.
 */
var config = require('./config/default.json');
var socketFunc = require('./socket_functions');

var oneTimeCalled = false

// Loop through all exchange market
function main(app) {
  for (var i = 0; i < config.exchanges.length; i++) {
    var market = config.exchanges[i];
    var marketName = market.name.toUpperCase();
    var marketWSS = market.wssurl;
    var marketPairs = market.pairs;

    // Test bitfinex only. so that skip other exchange market
    if (marketName === config.server.server_1) {
      console.log(config.server.server_1 + ' is stated!!!');
      // Loop to all pairs in this market and subcribe the socket channel for each pair
      for (var k = 0; k < marketPairs.length; k++) {
        // for (var k = 0; k < 5; k++) {
        socketFunc.processBITFINEX(app, marketName, marketWSS, marketPairs[k].symbol, marketPairs.length, countHandshakeSuccess)
      }
    }
  }
}

function countHandshakeSuccess(name, symbol, total) {
  // if (Object.keys(handShakeSuccess).indexOf(name) > -1) {
  //   handShakeSuccess[name] += 1
  //   console.log('['+name+'] handshake ' + handShakeSuccess[name] + '/' + total);
  // } else {
  //   handShakeSuccess['"'+name+'"'] = 1
  //   console.log('['+name+'] handshake ' + 1 + '/' + total);
  // }
  console.log('['+name+'] ' + symbol + ' is established!!!');
}

process.on('uncaughtException', function(err) {
  console.log('Global error catch: ' + err.message);
  if (!oneTimeCalled) {
    oneTimeCalled = true
    console.log('Server is crash!!!');
  }
});

var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(compression());
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(express.static(path.resolve(__dirname, './')));

app.get('/', function (req, res) {
  res.render('index.html')
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
app.set("Socket", io)

main(app)

http.listen(3001, function(){
  console.log('BBOT Server is started!!!');
});