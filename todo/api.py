from tastypie.resources import ModelResource
from todo.models import Task

from tastypie.serializers import Serializer
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication



class TaskSource(ModelResource):
    class Meta:
        queryset = Task.objects.all().order_by('created_at')
        resource_name = 'task'
        allowed_methods = ['get','post','delete','put']
        serializer = Serializer(formats=['json'])
        authentication = Authentication()
        authorization = Authorization()

