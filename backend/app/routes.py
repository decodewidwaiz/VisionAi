from flask import Blueprint
from .controller import detect_currency, health_check

# Create blueprint
api = Blueprint('api', __name__)

# Define routes
api.route('/detect', methods=['POST'])(detect_currency)
api.route('/health', methods=['GET'])(health_check)