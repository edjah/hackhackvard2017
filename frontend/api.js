const Twitter = require('twitter');


function get_access_token(service) {
  if (service == 'instagram') {
    return '646624057.b57982f.2e07934c74d245cfb4c57d08605e78cf';
  }
  else if (service == 'twitter') {
    return [
      '1074997705-RTpmtEv54XyziwcwnuLrAZckARCt0QjT0fnos0p',
      'mjykMgqc20pSRAYrUMiS3KONftWeqNkGLymlymfjaGfLT'
    ]
  }
}

function TwitterApi() {
  let tokens = get_access_token('twitter');
  this.client = new Twitter({
    consumer_key: 'c48R8Xcp37vMZnGI38FPTYJvS',
    consumer_secret: 'shixG6oUg5xCYB6LqcDGMdj4yaneiZ1GAZmfK8rbLqHKKnSqNl',
    access_token_key: tokens[0],
    access_token_secret: tokens[1]
  });

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



let t = new TwitterApi();
t.show_friendship('realDonaldTrump').then(function(x) {
  console.log('Friendship:', x);
  t.follow_user('realDonaldTrump').then(function(x) {
    console.log('Follow:', x);
    t.unfollow_user('realDonaldTrump').then(function(x) {
      console.log('Unfollow:', x)
    });
  });
});
