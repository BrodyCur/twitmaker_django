from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from twitmaker.models import Tweet
from twitmaker.forms import TweetForm
import json

def index(request):
    tweets = Tweet.objects.all()
    context = {'tweets': tweets, 'form': TweetForm()}
    return render(request, 'index.html', context)


def create_tweet(request):
    form = TweetForm(request.POST)
    tweet = form.instance
    if form.is_valid():
        form.save()
        data = {
            'message' : tweet.message,
            'date' : tweet.created_at,
        }
        return JsonResponse(data)
    else:
        context = {'tweets': Tweet.objects.all(), 'form': form}
        return render(request, 'index.html', context)
