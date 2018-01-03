const request = require('request-promise');

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUBTOKEN}`
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