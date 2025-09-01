from flask import Flask
from flask_cors import CORS
from .routes import api
import os

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow React to connect
    
    # Configure app
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
    
    # Register controller blueprint
    app.register_blueprint(api, url_prefix='/api')
    
    @app.route('/')
    def index():
        return '''
        <h1>Currency Detector API</h1>
        <p>Webcam-based currency detection</p>
        <p>Endpoints:</p>
        <ul>
            <li>POST /api/detect - Detect currency from base64 image</li>
            <li>POST /api/obj-detect - Object detection endpoint</li>
        </ul>
        '''
    
    return app