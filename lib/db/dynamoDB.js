const AWS = require('aws-sdk');

class DynamoDB {
  constructor() {
    //todo: replace config values with ENV VARS.
    this.dynamodb = new AWS.DynamoDB({
      region: 'us-west-2',
      apiVersion: '2012-08-10',
      endpoint: new AWS.Endpoint('http://localhost:8000'),
      accessKeyId: 'fakeKeyId',
      secretAccessKey: 'fakeSecretAccessKey',
      maxRetries: 3,
      retryDelayOptions: { base: 50 },
    });

    this.documentClient = new AWS.DynamoDB.DocumentClient({
      service: this.dynamodb,
    });
  }

  async query (params) {
    return await new Promise((resolve, reject) => {
      this.documentClient.query(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  async scan (params) {
    return await new Promise((resolve, reject) => {
      this.documentClient.scan(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  async put (params) {
    return await new Promise((resolve, reject) => {
      this.documentClient.put(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}

module.exports = new DynamoDB();