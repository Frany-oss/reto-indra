"use strict";

const AWS = require("aws-sdk");
const axios = require("axios");

AWS.config.setPromisesDependency(require("bluebird"));
AWS.config.update({ region: "us-east-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamoDb,
  axios,
};