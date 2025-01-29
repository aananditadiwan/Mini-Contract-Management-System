import logging
import traceback
from django.views.decorators.csrf import csrf_exempt
from contracts.services.ContractSrv import ContractSrv
from contracts.converter import responseFormatting
from rest_framework.decorators import api_view, permission_classes
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from contracts.models import *


log = logging.getLogger(__name__)


def get_contract_updates(data):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "contract_status_updates",
        {
            "type": "send_status_update",
            "status": data,
        },
    )


@csrf_exempt
@api_view(["GET"])
@permission_classes(())
def getContractListView(request):
    message = ""
    error_msg = ""
    error_code = "0"

    if request.method == "GET":
        try:
            filters = {
                "status": request.GET.get("status"),
                "search": request.GET.get("search"),
                "page": request.GET.get("page"),
                "page_size": request.GET.get("page_size"),
            }
            contractSrv = ContractSrv()
            contract_summary, error_msg, error_code = (
                contractSrv.get_contract_list_view(filters)
            )
            return responseFormatting(contract_summary, error_msg, error_code)
        except Exception as ex:
            log.error(traceback.format_exc())
            error_msg = "there are some issue in getting the Contracts."
            error_code = "EXE101"
            return responseFormatting(message, error_msg, error_code)

    else:
        error_msg = "Method not allowed."
        error_code = "MNF101"
        return responseFormatting("", error_msg, error_code)


@csrf_exempt
@api_view(["GET", "PUT", "DELETE"])
@permission_classes(())
def getContractDetailView(request, id):
    message = ""
    error_msg = ""
    error_code = "0"

    if request.method == "GET":
        try:
            contractSrv = ContractSrv()
            contract_summary, error_msg, error_code = (
                contractSrv.get_contract_detail_view(id)
            )
            return responseFormatting(contract_summary, error_msg, error_code)
        except Exception as ex:
            log.error(traceback.format_exc())
            error_msg = "there are some issue in getting the contract summary."
            error_code = "EXE102"
            return responseFormatting(message, error_msg, error_code)
    if request.method == "PUT":
        try:
            contract_data = request.data
            contractSrv = ContractSrv()
            contract_summary, error_msg, error_code = contractSrv.update_contract(
                id, contract_data
            )
           
            custom_message = f"Client {contract_data['client_name']}'s contract status has been updated to {contract_data['status']}."
            get_contract_updates(custom_message)
            return responseFormatting(contract_summary, error_msg, error_code)
        except Exception as ex:
            log.error(traceback.format_exc())
            error_msg = "there are some issue in getting the contract summary."
            error_code = "EXE102"
            return responseFormatting(message, error_msg, error_code)
    if request.method == "DELETE":
        try:
            contractSrv = ContractSrv()
            contract_summary, error_msg, error_code = contractSrv.delete_contract(id)
            return responseFormatting(contract_summary, error_msg, error_code)
        except Exception as ex:
            log.error(traceback.format_exc())
            error_msg = "there are some issue in getting the contract summary."
            error_code = "EXE102"
            return responseFormatting(message, error_msg, error_code)

    else:
        error_msg = "Method not allowed."
        error_code = "MNF02"
        return responseFormatting("", error_msg, error_code)


@csrf_exempt
@api_view(["POST"])
@permission_classes(())
def setContractUpload(request):
    message = ""
    error_msg = ""
    error_code = "0"

    if request.method == "POST":
        try:
            contract_file = request.FILES.get("file")
            contractSrv = ContractSrv()
            contract_summary, error_msg, error_code = contractSrv.set_contract_upload(
                contract_file
            )
            return responseFormatting(contract_summary, error_msg, error_code)
        except Exception as ex:
            log.error(traceback.format_exc())
            error_msg = "there are some issue in getting the Contracts."
            error_code = "EXE101"
            return responseFormatting(message, error_msg, error_code)
    else:
        error_msg = "Method not allowed."
        error_code = "MNF101"
        return responseFormatting("", error_msg, error_code)
