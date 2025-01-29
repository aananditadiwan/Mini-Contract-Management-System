from rest_framework.utils.serializer_helpers import ReturnList
from rest_framework.serializers import ListSerializer
from django.http.response import JsonResponse
from django.core.exceptions import ValidationError
import json
import numpy as np
from datetime import date

class json_serialize(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, date):
            return obj.isoformat()
        return json.JSONEncoder.default(self, obj)

def responseFormatting(data,error_msg,error_code,error_dtl=None):
    """Formats the data got from Service into a JsonResponse"""
    error_res=""
    if not(isinstance(data, list)):
        data = json.loads(json.dumps(data, cls=json_serialize))
    if error_dtl:
        error_res=[{key:value[0] for key,value in dict(error_dtl).items()}]
    else:
        error_res=[]

    if type(data)==list or type(data)==ReturnList:
        res_data = data
    elif  type(data)==ListSerializer:
        res_data = data.data
    else:
        if len(data)<=0:
            res_data = []
        else:
            res_data = [data]
    return JsonResponse({"data": res_data,"error_msg":error_msg,"error_code":error_code,"error_dtl":error_res},safe=False)        

