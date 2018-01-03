const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

db.once('open', function() {
  let repoSchema = mongoose.Schema({ //attribute location on api resp
    owner: {
      username: String, // owner.login
      userId: Number, //owner.id
      avatarUrl: String // owner.avatar_url
    },
    repoId: {
      type: Number,
      unique: true 
    }, //id
    repoName: String,
    htmlUrl: String, //html_url
    description: String, //description
    createdAt: Date, //created_at
    updatedAt: Date, //updated_at
    language: String, // language
    stargazerCount: Number // stargazers_count
  });

  // middleware. validates that all new inserts are unique. If not, inserts none.
  repoSchema.plugin(uniqueValidator);

  let Repo = mongoose.model('Repo', repoSchema);

  let save = (rawRepoData) => {
    //takes rawRepoData from API and parses it into format for database
    let formattedRepos = rawRepoData.map(function (repo) {
      return {
        owner: {
          username: repo.owner.login,
          userId: repo.owner.id,
          avatarUrl: repo.owner.avatar_url
        },
        repoId: repo.id,
        repoName: repo.name,
        htmlUrl: repo.html_url,
        description: repo.description,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        language: repo.language,
        stargazerCount: repo.stargazers_count
      }
    });
    // returns a promise
    return Repo.insertMany(formattedRepos);
  }

  let pullTopResults = () => {
    return Repo.find({}, 'repoName stargazerCount htmlUrl updatedAt owner.username owner.avatarUrl', {limit: 25, sort: {'stargazerCount': -1}});
  }

  module.exports.save = save;
  module.exports.pullTopResults = pullTopResults;
});