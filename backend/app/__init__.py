from flask import Flask
from flask_cors import CORS
from .routes import api

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow React to connect
    
    # Register routes
    app.register_blueprint(api, url_prefix='/api')
    
    @app.route('/')
    def home():
        return '''
        <h1>Currency Detector API</h1>
        <p>Webcam-based currency detection</p>
        <p>Endpoints:</p>
        <ul>
            <li>POST /api/detect - Detect currency from base64 image</li>
            <li>GET /api/health - Check status</li>
        </ul>
        '''
    
    return app