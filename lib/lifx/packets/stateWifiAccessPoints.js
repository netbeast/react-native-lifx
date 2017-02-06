'use strict';

var constants = require('../../lifx').constants;

var Packet = {
  size: 38
};

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {Object}     Information contained in packet
 */
Packet.toObject = function(buf) {
  var obj = {};
  var offset = 0;

  // Check length
  if (buf.length !== this.size) {
    throw new Error('Invalid length given for stateWifiAccessPoints LIFX packet');
  }

  obj.networkInterface =

  obj.ssid = buf.toString('utf8', offset, offset + 32);
  obj.ssid = obj.ssid.replace(/\0/g, '');
  offset += 32;

  obj.security = buf.readUInt32LE(offset);
  var security = constants.WIFI_ACCESS_POINT_SECURITY[obj.security];
  if (security !== undefined) {
    obj.security = security;
  }
  offset += 4;

  obj.strength = '';
  obj.channel = '';

  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @return {Buffer}     packet
 *
Packet.toBuffer = function(obj) {
  var buf = new Buffer(this.size);
  buf.fill(0);
  var offset = 0;

  buf.writeUInt32LE(obj.vendor, offset);
  offset += 4;

  buf.writeUInt32LE(obj.product, offset);
  offset += 4;

  buf.writeUInt32LE(obj.version, offset);
  offset += 4;

  return buf;
};*/

module.exports = Packet;
