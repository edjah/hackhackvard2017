var Twitter = require('twitter');
var ig = require('instagram-node').instagram();

var TwitterApi = {
  client: new Twitter({
    consumer_key: 'SlmviNMdAb6huFvLHMZJlQbq8',
    consumer_secret: 'aeFrXtQesdSLiOtgHbVZ3TypDj0coWql1aLvEIAyjznZkHLb3Y',
    access_token_key: '1074997705-6igLWVXFpBkYkBU7A0YOk3SBg2qhGSu0W5lutoS',
    access_token_secret: '5RENTGy1ccT7UiWZoIXU23QncM3yf6WKnbDnSHX7NMgTl'
  }),

  show_friendship: function(user) {
    return this.client.get('friendships/show', {target_screen_name: user})
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        return error;
      });
  },

  follow_user: function(user) {
    return this.client.post('friendships/create', {screen_name: 'realDonaldTrump'})
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        return error;
      });
  },

  unfollow_user: function(user) {
    return this.client.post('friendships/destroy', {screen_name: 'realDonaldTrump'})
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        return error;
      });
  }
}

/*
var redirect_uri = 'http://yoursite.com/handleauth';

function authorize_user(req, res) {
  res.redirect(ig.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

function handleauth(req, res) {
  ig.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

// This is where you would initially send users to authorize
app.get('/authorize_user', authorize_user);
// This is your redirect URI
app.get('/handleauth', handleauth);



ig.use({
  access_token: 'H9naNYgRP51eJTb2AOwXtcu90aphSuZb',
  client_id: 'b57982fe5e6f443c9af859510cd769c2',
  client_secret: '4f134616fe424041a2b560a3e4250cdd'
});


ig.user_search('username', function(err, users, remaining, limit) {
  if (err) {
    throw err;
  }

  console.log(users);

  console.log(remaining);

  console.log(limit);
});

var InstagramApi = {

}
*/



TwitterApi.show_friendship('nenyaDaNinja').then(console.log);

TwitterApi.follow_user('realDonaldTrump').then(console.log);

TwitterApi.unfollow_user('realDonaldTrump').then(console.log);




