var owner = process.argv[2]
var name = process.argv[3]

var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

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

getRepoContributors(owner, name, function(giantList){
  var pic = 0
for (var user of giantList) {
    console.log(user.avatar_url)
    downloadImageByURL(user.avatar_url, "./pictures", pic )
    pic ++

  }
})


function downloadImageByURL(url, filePath, pic) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('./avatar' + pic + '.jpg'));
}