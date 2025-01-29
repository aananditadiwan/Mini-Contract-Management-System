import json
import logging
import traceback
from django.forms import ValidationError
from contracts.models.ContractModels import ContractModel
from contracts.serializers.ContractSerializer import *
from django.db.models import Q
from django.core.paginator import Paginator

log = logging.getLogger(__name__)


class ContractSrv:
    def __init__(self) -> None:
        pass

    def get_contract_list_view(self, filters):
        try:
            status = filters.get("status")
            search = filters.get("search")
            page = int(filters.get("page", 1))
            page_size = int(filters.get("page_size", 10))
            query = Q()
            if status:
                query &= Q(status__iexact=status)
            if search:
                query &= Q(client_name__icontains=search) | Q(
                    contract_id__icontains=search
                )
            contracts = ContractModel.objects.filter(query)

            paginator = Paginator(contracts, page_size)
            paged_contracts = paginator.get_page(page)

            if paged_contracts:
                serializer = ContractSerializer(paged_contracts, many=True)
                response_data = {
                    "contracts": serializer.data,
                    "pagination": {
                        "total_count": paginator.count,
                        "current_page": page,
                    },
                }
                return response_data, "", ""
            else:
                return {}, "No Data Found", "NDF_ERR1"
        except Exception as ex:
            log.error(traceback.format_exc())
            return {}, ex.args[0], "EXEC_ERR1"

    def get_contract_detail_view(self, id):
        try:
            contracts = ContractModel.objects.get(id=id)

            serializer = ContractSerializer(contracts, many=False)
            return serializer.data, "", ""
        except ContractModel.DoesNotExist:
            return {}, "No Data Found", "NDF_ERR2"
        except Exception as ex:
            log.error(traceback.format_exc())
            return {}, ex.args[0], "EXEC_ERR2"

    def update_contract(self, id, data):
        try:
            contract = ContractModel.objects.get(id=id)
            serializer = ContractSerializer(contract, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return {}, "", ""
            else:
                raise ValidationError(serializer.errors)
        except ContractModel.DoesNotExist:
            return {}, "No Data Found", "NDF_ERR3"
        except Exception as ex:
            log.error(traceback.format_exc())
            return {}, ex.args[0], "EXEC_ERR3"

    def delete_contract(self, id):
        try:
            contract = ContractModel.objects.get(id=id)
            contract.delete()
            return {}, "", ""
        except ContractModel.DoesNotExist:
            return {}, "No Data Found", "NDF_ERR4"
        except Exception as ex:
            log.error(traceback.format_exc())
            return {}, ex.args[0], "EXEC_ERR4"

    def set_contract_upload(self, contract_file):
        try:
            if contract_file.name.endswith(".json"):
                contract_data = json.load(contract_file)
                for contract in contract_data:
                    extra_fields = {
                        "agreement_type": contract.get("agreement_type"),
                        "start_date": contract.get("start_date"),
                        "end_date": contract.get("end_date"),
                        "terms": contract.get("terms"),
                    }
                    contract_obj = ContractModel(
                        client_name=contract.get("client_name"),
                        contract_id=contract.get("contract_id"),
                        contract_data=extra_fields,
                        status=contract.get("status"),
                        created_at=contract.get("created_at"),
                    )
                    contract_obj.save()
            elif contract_file.name.endswith(".txt"):
                file_content = json.loads(contract_file.read().decode("utf-8"))
                for line in file_content:
                    contract_obj = ContractModel(
                        client_name=line.get("client_name"),
                        contract_id=line.get("contract_id"),
                        contract_data={
                            "agreement_type": line.get("agreement_type"),
                            "start_date": line.get("start_date"),
                            "end_date": line.get("end_date"),
                            "terms": line.get("terms"),
                        },
                        status=line.get("status"),
                        created_at=line.get("created_at"),
                    )
                    contract_obj.save()
            else:
                return {}, "Unsupported file type", "UTF_ERR2"
            return {}, "", ""
        except Exception as ex:
            log.error(traceback.format_exc())
            return {}, ex.args[0], "EXEC_ERR5"
