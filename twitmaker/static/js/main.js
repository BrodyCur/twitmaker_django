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

      const tweetTime = document.createElement('time');
      const dateFormat = response.headers.date;
      tweetTime.innerText = dateFormat;

      const deleteButton = document.createElement('a');
      var deleteUrl = "{% url 'delete_tweet' id=tweet.pk %}";
      deleteButton.href = deleteUrl;
      deleteButton.className = 'delete-button';

      newTweetLi.append(tweetTime);
      newTweetLi.append(tweetMessage);
      newTweetLi.append(deleteButton);
      tweets.append(newTweetLi);

      document.querySelector('textarea[name=message]').value = '';
    }).catch(function(error) {
      console.log(error);
    });
  });

  let deleteBtn = document.querySelector('.delete-button');
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    axios.delete(deleteBtn.href, {
      params : {id : e.target.id}
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  });
});