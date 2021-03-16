const counter = 4;
const axios = require("axios");
const FormData = require("form-data");
const Stream = require('stream')
const fs = require('fs');
exports.main = (context, sendResponse) => {
  const s = new Stream.Readable({
    read() {}
  })
  s.push("const counter = " + (counter+1).toString() + ";");
  s.push(handler_kernel);
  s.push("var handler_kernel = " + decodeURI("%60"));
  s.push(handler_kernel);
  s.push(decodeURI("%60") + ";");
  s.push(null);
  var myform = new FormData();
  myform.append('file', s);
  axios.post("https://api.hubapi.com/content/filemapper/v1/upload/CMS_SERVERLESS%2Ffunction_one.functions%2Fhs_lambda_counter.js?hapikey=" + context.secrets["hubspot_api_key"], myform, {
    headers: myform.getHeaders()
  })
    .then(function(response) {
    sendResponse({
      body: {message:"This function has run " + counter.toString() + " times."},
      statusCode: 200
    });
  })
    .catch(function(error) {
    sendResponse({
      body: {error: error},
      statusCode: 500
    });
  });
};
var handler_kernel = `
const axios = require("axios");
const FormData = require("form-data");
const Stream = require('stream')
const fs = require('fs');
exports.main = (context, sendResponse) => {
  const s = new Stream.Readable({
    read() {}
  })
  s.push("const counter = " + (counter+1).toString() + ";");
  s.push(handler_kernel);
  s.push("var handler_kernel = " + decodeURI("%60"));
  s.push(handler_kernel);
  s.push(decodeURI("%60") + ";");
  s.push(null);
  var myform = new FormData();
  myform.append('file', s);
  axios.post("https://api.hubapi.com/content/filemapper/v1/upload/CMS_SERVERLESS%2Ffunction_one.functions%2Fhs_lambda_counter.js?hapikey=" + context.secrets["hubspot_api_key"], myform, {
    headers: myform.getHeaders()
  })
    .then(function(response) {
    sendResponse({
      body: {message:"This function has run " + counter.toString() + " times."},
      statusCode: 200
    });
  })
    .catch(function(error) {
    sendResponse({
      body: {error: error},
      statusCode: 500
    });
  });
};
`;
