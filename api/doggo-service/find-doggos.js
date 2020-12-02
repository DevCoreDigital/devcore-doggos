const https = require('https');

const runPost = () => {
  const body = {
    apikey: 'wuZik2ce',
    objectType: 'animals',
    objectAction: 'publicSearch',
    search: {
      resultStart: 0,
      resultLimit: 5,
      calFoundRows: 'Yes',
      filters: [
        {
          fieldName: 'animalSpecies',
          operation: 'equals',
          criteria: 'dog'
        },
        {
          fieldName: 'animalStatus',
          operation: 'equals',
          criteria: 'Available'
        },
        {
          fieldName: 'animalLocation',
          opration: 'equals',
          criteria: '27355'
        }
      ],
      fields: [
        'animalName',
        'animalBreed',
        'animalLocation',
        'locationState',
        'locationCity'
      ]
    }
  };
  const options = {
    hostname: 'api.rescuegroups.org',
    path: '/http/v2.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(responseData));
      });
    });
    req.on('error', (e) => {
      reject(JSON.parse(e));
    });
    req.write(JSON.stringify(body));
    req.end();
  });
};

module.exports.handler = async (event) => {
  const response = await runPost()
    .then((response) => {
      return JSON.stringify({
        isBase64Encoded: false,
        statusCode: 200,
        body: response.data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    })
    .catch((error) => {
      return error;
    });
  return response;
};
