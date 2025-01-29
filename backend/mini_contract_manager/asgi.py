"""
ASGI config for mini_contract_manager project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from contracts import consumers
from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mini_contract_manager.settings')

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    path("ws/contractStatus/", consumers.ContractStatus.as_asgi()),
                ]
            )
        ),
    }
)
