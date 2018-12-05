var request = require('request');
var secret = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'Authorization': 'token ' + secret.GITHUB_TOKEN,
      'User-Agent': 'ME'
    }
  };

  request(options, function(err, res, body) {
  var jsObject = JSON.parse(body)

    cb(jsObject);
  });
}

getRepoContributors('jquery', 'jquery', function(giantList){
for (var user of giantList) {
    console.log(user.avatar_url)
  }
})