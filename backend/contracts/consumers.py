import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ContractStatus(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "contract_status_updates"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json["message"]
    #     # handle incoming messages

    async def send_status_update(self, event):
        status = event["status"]
        await self.send(text_data=json.dumps({"status": status}))
