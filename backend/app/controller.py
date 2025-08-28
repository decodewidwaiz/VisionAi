from flask import request, jsonify
from .service import detector

def detect_currency():
    """Handle webcam detection request"""
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Get detection result
        result = detector.detect(
            image_data=data['image'],
            confidence=data.get('confidence', 0.5)
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