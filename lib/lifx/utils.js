'use strict';

var NetworkInfo = require('react-native-network-info');
var productDetailList = require('./products.json');
var utils = exports;

/**
 * Return all ip addresses of the machine
 * @return {Array} list containing ip address info
 */
 utils.getHostIPs = function () {
   return new Promise((resolve, reject) => {
    let _ip
    NetworkInfo.getIPAddress(ip => {
      resolve(_ip = ip)
    })

    setTimeout(() => {
      if (!_ip) reject(new Error('Could not retrieve own ip'))
    }, 1000)
  })
 }

/**
 * Generates a random hex string of the given length
 * @example
 * // returns something like 8AF1
 * utils.getRandomHexString(4)
 * @example
 * // returns something like 0D41C8AF
 * utils.getRandomHexString()
 * @param  {Number} [length=8] string length to generate
 * @return {String}            random hex string
 */
utils.getRandomHexString = function(length) {
  var string = '';
  var chars = '0123456789ABCDEF';

  if (!length) {
    length = 8;
  }

  for (var i = 0; i < length; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    string += chars.substring(randomNumber, randomNumber + 1);
  }

  return string;
};

/**
 * Reads a little-endian unsigned 64-bit value and returns it as buffer
 * This function exists for easy replacing if a native method will be provided
 * by node.js and does not make sense like is
 * @param  {Buffer} buffer buffer to read from
 * @param  {Number} offset offset to begin reading from
 * @return {Buffer}        resulting 64-bit buffer
 */
utils.readUInt64LE = function(buffer, offset) {
  return buffer.slice(offset, offset + 8);
};

/**
 * Writes a 64-bit value provided as buffer and returns the result
 * This function exists for easy replacing if a native method will be provided
 * by node.js and does not make sense like is
 * @param  {Buffer} buffer buffer to write from
 * @param  {Number} offset offset to begin reading from
 * @param  {Buffer} input  the buffer to write
 * @return {Buffer}        resulting 64-bit buffer
 */
utils.writeUInt64LE = function(buffer, offset, input) {
  return input.copy(buffer, offset, 0, 8);
};

/**
 * Validates a given ip address is IPv4 format
 * @param  {String} ip IP address to validate
 * @return {Boolean}   is IPv4 format?
 */
utils.isIpv4Format = function(ip) {
  var ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
  return ipv4Regex.test(ip);
};

/**
* Get's product and vendor details for the given id's
* hsb integer object
* @param {Number} vendorId id of the vendor
* @param {Number} productId id of the product
* @return {Object|Boolean} product and details vendor details or false if not found
*/
utils.getHardwareDetails = function(vendorId, productId) {
  for (var i = 0; i < productDetailList.length; i += 1) {
    if (productDetailList[i].vid === vendorId) {
      for (var j = 0; j < productDetailList[i].products.length; j += 1) {
        if (productDetailList[i].products[j].pid === productId) {
          return {
            vendorName: productDetailList[i].name,
            productName: productDetailList[i].products[j].name,
            productFeatures: productDetailList[i].products[j].features
          };
        }
      }
    }
  }

  return false;
};
