from django.db import models
from django.utils.translation import gettext as _

class Task(models.Model):
    description = models.CharField(max_length=50,verbose_name=_("Description"))
    is_completed = models.BooleanField(default=False,verbose_name=_("Is task completed?"))
    created_at = models.DateField(auto_now_add=True,verbose_name=_("Task created at"))
    completed_at = models.DateField(blank=True,null=True,verbose_name=_("Task completed at"))

    def __str__(self):
        return self.description
    def __unicode__(self):
        return self.description

    class Meta:
        ordering = ["-created_at"]

