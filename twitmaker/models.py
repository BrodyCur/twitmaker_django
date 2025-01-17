from django.db import models

class Tweet(models.Model):
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return "Tweet {}: {}".format(self.pk, self.message)