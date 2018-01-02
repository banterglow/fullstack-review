const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({ //attribute location on api resp
  owner: {
    username: String, // owner.login
    userId: Number, //owner.id
    avatarUrl: String // owner.avatar_url
  },
  htmlUrl: String, //html_url
  description: String, //description
  createdAt: Date, //created_at
  updatedAt: Date, //updated_at
  language: String, // language
  stargazerCount: Number // stargazers_count
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;