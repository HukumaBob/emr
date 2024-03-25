import base64
import os
import uuid
from django.conf import settings
from django.core.files.base import ContentFile


def file_to_base64(file_path):
    with open(file_path, 'rb') as f:
        return base64.b64encode(f.read())


def base64_to_file(file_data, prefix):
    format, imgstr = file_data.split(';base64,') 
    ext = format.split('/')[-1].split(';')[0]
    data = ContentFile(
        base64.b64decode(imgstr), name=f'{prefix}-{uuid.uuid4()}.{ext}'
        )
    return data


def find_and_replace_files_in_json(data, format, prefix, path=None):
    if isinstance(data, dict):
        for key in data.keys():
            value = data.get(key)
            if isinstance(value, str) and value.startswith(format):
                file = base64_to_file(value, prefix)
                file_path = os.path.join(
                    path, file.name
                    )
                with open(file_path, 'wb+') as destination:
                    for chunk in file.chunks():
                        destination.write(chunk)
                data[key] = file.name  # replace file data with file name
            elif isinstance(value, list):
                for i, item in enumerate(value):
                    if isinstance(item, str) and item.startswith(format):
                        file = base64_to_file(item, prefix)
                        file_path = os.path.join(
                            path, file.name
                            )
                        with open(file_path, 'wb+') as destination:
                            for chunk in file.chunks():
                                destination.write(chunk)
                        data[key][i] = file.name  # replace file data with file name                        
            elif isinstance(value, dict):
                find_and_replace_files_in_json(value, format)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            if isinstance(item, str) and item.startswith(format):
                file = base64_to_file(item, prefix)
                file_path = os.path.join(
                    path, file.name
                    )
                with open(file_path, 'wb+') as destination:
                    for chunk in file.chunks():
                        destination.write(chunk)
                data[i] = file.name  # replace file data with file name
    return data


def find_and_replace_url_in_json(data, prefix, path):
    if isinstance(data, dict):
        for key in data.keys():
            value = data.get(key)
            if isinstance(value, str) and value.startswith(prefix):
                file_path = os.path.join(path, value)
                with open(file_path, 'rb') as file:
                    data[key] = base64.b64encode(file.read()).decode()  # base64 encode, no decode
            elif isinstance(value, list):
                for i, item in enumerate(value):
                    if isinstance(item, str) and item.startswith(prefix):
                        file_path = os.path.join(path, item)
                        with open(file_path, 'rb') as file:
                            data[key][i] = base64.b64encode(file.read()).decode()  # base64 encode, no decode
            elif isinstance(value, dict):
                find_and_replace_url_in_json(value, prefix, path)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            if isinstance(item, str) and item.startswith(prefix):
                file_path = os.path.join(path, item)
                with open(file_path, 'rb') as file:
                    data[i] = base64.b64encode(file.read()).decode()  # base64 encode, no decode
    return data

