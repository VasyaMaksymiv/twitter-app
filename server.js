const express = require('express')
const Twitter = require('twitter')
const path = require('path')
var R = require("request");

const app = express();

const client = new Twitter({
    consumer_key: '62N9HOJ2LWzpcJcm039YkJSTb',
    consumer_secret: 'qaeg3UAi3OgMXMTWCUG7UGz0r4MuGJBC5nG9Rh9caWCwYsbaHy',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAADKK4QAAAAAAwAlP3YMsnIQfFzjvLXdrCEk3yZA%3DdocTQqbygQTmBG7KH9XNWaBC6e3GgM0sbAULDWR9g3KXDmVbiz'
});



var key = '62N9HOJ2LWzpcJcm039YkJSTb';
var secret = 'qaeg3UAi3OgMXMTWCUG7UGz0r4MuGJBC5nG9Rh9caWCwYsbaHy';

var cat = key +":"+secret;
var credentials = new Buffer(cat).toString('base64');

var url = 'https://api.twitter.com/oauth2/token';

R({
    url: url,
    method: 'POST',
    headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"
},function(err, resp, body) {
    console.log(body);
});


app.set("port", process.env.PORT || 3001);

app.get("/api/search", (req, res) => {
    const param = req.query.q;

    const options = {
        q: param,
        result_type: 'recent',
        count: 20
    }

    client.get('search/tweets', options, function (error, tweets, response) {
        res.json(tweets);
    });
});


// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    const staticFiles = express.static("client/build")
    app.use(staticFiles)
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});