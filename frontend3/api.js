const Twitter = require('twitter');
import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('contact');
manager.configure({
  twitter: {
    consumer_key: 'c48R8Xcp37vMZnGI38FPTYJvS',
    consumer_secret: 'shixG6oUg5xCYB6LqcDGMdj4yaneiZ1GAZmfK8rbLqHKKnSqNl'
  }
});

const twitter_tokens = [
  '1074997705-RTpmtEv54XyziwcwnuLrAZckARCt0QjT0fnos0p',
  'mjykMgqc20pSRAYrUMiS3KONftWeqNkGLymlymfjaGfLT'
]

function TwitterApi() {
  manager.authorize('twitter')
  .then(function(resp) {
    console.log('Your users ID', resp);
    this.client = new Twitter({
      consumer_key: 'c48R8Xcp37vMZnGI38FPTYJvS',
      consumer_secret: 'shixG6oUg5xCYB6LqcDGMdj4yaneiZ1GAZmfK8rbLqHKKnSqNl',
      access_token_key: twitter_tokens[0],
      access_token_secret: twitter_tokens[1]
    });

  })
  .catch(err => console.log('There was an error', err));

  this.show_friendship = function(user) {
    return this.client.get('friendships/show', {target_screen_name: user})
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        return error;
      });
  },

  this.follow_user = function(user) {
    return this.client.post('friendships/create', {screen_name: 'realDonaldTrump'})
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        return error;
      });
  },

  this.unfollow_user = function(user) {
    return this.client.post('friendships/destroy', {screen_name: 'realDonaldTrump'})
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        return error;
      });
  }
}

function GoogleApi() {
  this.client = new GoogleContacts({
    token: get_access_token('google')
  });

  this.show_friendship = function(user) {
    // TODO
  }

  this.follow_user = function(user) {
    // TODO
  }

  this.unfollow_user = function(user) {
    // TODO
  }
}

let t = new TwitterApi();
// t.show_friendship('realDonaldTrump').then(function(x) {
//   console.log('Friendship:', x);
//   t.follow_user('realDonaldTrump').then(function(x) {
//     console.log('Follow:', x);
//     t.unfollow_user('realDonaldTrump').then(function(x) {
//       console.log('Unfollow:', x)
//     });
//   });
// });
