var options = {
  host: '2.0.0.5',
  iface: '2.0.0.1',
}

var artnet = require('artnet')(options);
var color = [
  Math.round(Math.random() * 255),
  Math.round(Math.random() * 255),
  Math.round(Math.random() * 255),
]


// set channel 1 to 255 and disconnect afterwards. 
artnet.set(1, 1, color, function (err, res) {
  console.log(err, res);
  artnet.close();
});
