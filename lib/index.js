'use strict';

var _ = require("lodash");

var pemHeadersAndFooter = {
  cert: {
    header: "-----BEGIN CERTIFICATE-----", 
    footer: "-----END CERTIFICATE-----"
  },
  pub: {
    header: "-----BEGIN PUBLIC KEY-----",
    footer: "-----END PUBLIC KEY-----"
  },
  rsa_pub: {
    header: "-----BEGIN RSA PUBLIC KEY-----",
    footer: "-----END RSA PUBLIC KEY-----"
  },
  rsa_priv: {
    header: "-----BEGIN RSA PRIVATE KEY-----",
    footer: "-----END RSA PRIVATE KEY-----"
  }
};

var CHARACTERS_ON_CERTIFICATE_LINE = 64;

function base64WithSplitCharLines(data){
  return _.chain(data.toString('base64'))
    .chunk(CHARACTERS_ON_CERTIFICATE_LINE)
    .map(function (str) {return str.join(""); } )
    .value();
}

function convertBufferDerToPem(data, options){
  return _.flatten([
    [pemHeadersAndFooter[options.type].header],
    base64WithSplitCharLines(data),
    [pemHeadersAndFooter[options.type].footer]
  ], true).join("\n");
}

module.exports = {
  convert: function (data, optionsArgs) {
    return convertBufferDerToPem(data, _.extend(optionsArgs || {},  {type: "cert"}));
  }
};