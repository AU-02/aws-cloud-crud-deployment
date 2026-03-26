from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
import boto3 
import json 
import os 

from rest_framework.parsers import FormParser, JSONParser

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        instance = serializer.save()

        # Convert data to JSON
        data = {
            "id": instance.id,
            "title": instance.title,
            "description": instance.description,
        }

        json_data = json.dumps(data)

        # Upload to S3
        try:
            s3 = boto3.client(
                "s3",
                aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
                aws_secret_access_key=os.getenv("AWS_SECRET_KEY"),
                region_name=os.getenv("AWS_REGION"),
            )

            s3.put_object(
                Bucket=os.getenv("AWS_BUCKET"),
                Key=f"tasks/task_{instance.id}.json",
                Body=json_data,
                ContentType="application/json"
            )

        except Exception as e:
            print("S3 Upload Error:", e)