const request = require('request-promise');
const config = require(__dirname + '/../config.js');

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  
  return request(options)
    .then(JSON.parse)
    .then(function(repos) {
      console.log(`Repos obtained! Total number:`, repos.length);
      return repos;
    })
}

module.exports.getReposByUsername = getReposByUsername;