from flask import request, jsonify
from .service import detector
import base64
import io
from PIL import Image
import random

def detect_currency():
    """Handle webcam detection request"""
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Get detection result
        result = detector.detect(
            image_data=data['image'],
            confidence=data.get('confidence', 0.4)
        )
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            'detected': False,
            'currency': 'Server error',
            'confidence': 0,
            'error': str(e)
        }), 500

def health_check():
    """Service health check"""
    return jsonify({
        "status": "working good" if detector.model else "error",
        "model_loaded": detector.model is not None
    }), 200

def obj_detect():
    """Handle object detection request (simulation for client-side processing)"""
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Since frontend uses TensorFlow.js for object detection,
        # this endpoint serves as a backup/simulation
        confidence_threshold = data.get('confidence', 0.5)
        
        # Simulate object detection response
        simulated_objects = [
            {'class': 'person', 'confidence': 0.89, 'bbox': [100, 50, 200, 300]},
            {'class': 'car', 'confidence': 0.76, 'bbox': [300, 100, 150, 120]},
            {'class': 'bicycle', 'confidence': 0.65, 'bbox': [50, 200, 80, 150]}
        ]
        
        # Filter by confidence threshold
        filtered_objects = [
            obj for obj in simulated_objects 
            if obj['confidence'] >= confidence_threshold
        ]
        
        return jsonify({
            'success': True,
            'objects': filtered_objects,
            'count': len(filtered_objects),
            'mode': 'simulation',
            'message': 'Frontend uses TensorFlow.js for real-time detection'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'objects': [],
            'count': 0
        }), 500