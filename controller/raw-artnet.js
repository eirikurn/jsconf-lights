var dgram = require('dgram')
var Buffer = require('buffer').Buffer

function ArtNetClient(host, port, iface) {
  this._host = host
  this._port = port
  this._socket = dgram.createSocket("udp4")
  if (iface) {
    this._socket.bind(port, iface);
  }
  
  this.HEADER = [65, 114, 116, 45, 78, 101, 116, 0, 0, 80, 0, 14] // 0 - 11
  this.SEQUENCE = [0] // 12
  this.PHYSICAL = [0] // 13
  this.UNIVERSE = [0, 0] // 14 - 15
  //this.LENGTH = [0, 13] // 16 - 17
}
exports.ArtNetClient = ArtNetClient

exports.createClient = function(host, port) {
  return new ArtNetClient(host, port)
}

ArtNetClient.prototype.send = function(universe, data, cb) {
  // Calcualte the length
  var length_upper = Math.floor(data.length / 256)
  var length_lower = data.length % 256

  this.UNIVERSE[0] = universe
  var data = this.HEADER.concat(this.SEQUENCE).concat(this.PHYSICAL).concat(this.UNIVERSE).concat([length_upper, length_lower]).concat(data)
  var buf = Buffer(data)
  this._socket.send(buf, 0, buf.length, this._port, this._host, cb)
}

ArtNetClient.prototype.close = function(){
  this._socket.close()
}


const { artnet: options } = require('./config')
const artnet = new ArtNetClient(options.host, options.port, options.iface)

function send(channels, cb) {
  artnet.send(options.universe, channels, cb)
}

module.exports = send
