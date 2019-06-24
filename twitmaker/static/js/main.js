document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    axios.post(
      this.action,
      formData,
    ).then(function(response) {
      console.log(response);
      const tweets = document.querySelector('.tweets');
      const newTweetLi = document.createElement('li');
      newTweetLi.className = 'tweet';

      const tweetMessage = document.createElement('p');
      tweetMessage.innerText = response.data.message;

      const  tweetTime = document.createElement('time');
      const dateFormat = response.headers.date;
      tweetTime.innerText = dateFormat;

      newTweetLi.append(tweetTime);
      newTweetLi.append(tweetMessage);
      tweets.append(newTweetLi);

      document.querySelector('textarea[name=message]').value = '';
    }).catch(function(error) {
      console.log(error);
    });
  });
});