from flask import Blueprint
from .controller import detect_currency, health_check, obj_detect

# Create one blueprint
api = Blueprint('api', __name__)

# Define routes
api.route('/detect', methods=['POST'])(detect_currency)
api.route('/obj-detect', methods=['POST'])(obj_detect)
api.route('/health', methods=['GET'])(health_check)
