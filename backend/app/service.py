import cv2
import numpy as np
from PIL import Image
try:
    from ultralytics import YOLO
    YOLO_AVAILABLE = True
except ImportError:
    YOLO_AVAILABLE = False
    print("⚠️ YOLO not available - running in simulation mode only")
import os
import random

class CurrencyDetector:
    def __init__(self):
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load YOLO model or use simulation"""
        if not YOLO_AVAILABLE:
            print("⚠️ YOLO not available - using simulation mode")
            self.model = None
            return
            
        model_path = "models/best.pt"
        
        if os.path.exists(model_path):
            try:
                self.model = YOLO(model_path)
                print("✅ Model loaded successfully")
            except Exception as e:
                print(f"❌ Model loading failed: {e}")
                self.model = None
        else:
            print("⚠️ Model not found - using simulation mode")
            self.model = None
    
    def detect(self, image_data, confidence=0.4):
        """Detect currency from base64 image"""
        try:
            # Convert base64 to PIL image
            import base64
            import io
            
            # Remove data URL prefix
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            
            # Decode and convert
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            
            if self.model:
                # Real YOLO detection
                results = self.model.predict(source=image, conf=confidence, verbose=False)
                
                for r in results:
                    if r.boxes is not None and len(r.boxes) > 0:
                        # Get best detection
                        best_box = r.boxes[0]  # Highest confidence
                        cls_id = int(best_box.cls[0])
                        conf = float(best_box.conf[0])
                        
                        # Get currency name from class names
                        if hasattr(self.model, 'names'):
                            currency = self.model.names[cls_id]
                            # Clean up name: "10_rupee" -> "10 Rupees"
                            currency = currency.replace('_rupee', ' Rupees').replace('_', ' ').title()
                        else:
                            currency = f"Currency Class {cls_id}"
                        
                        return {
                            'detected': True,
                            'currency': currency,
                            'confidence': round(conf * 100, 1)
                        }
                
                return {
                    'detected': False,
                    'currency': 'No currency detected',
                    'confidence': 0
                }
            else:
                # Simulation mode for demo
                return self._simulate_detection()
                
        except Exception as e:
            return {
                'detected': False,
                'currency': 'Detection error',
                'confidence': 0,
                'error': str(e)
            }
    
    def _simulate_detection(self):
        """Simulate detection for demo"""
        currencies = ['10 Rupees', '20 Rupees', '50 Rupees', '100 Rupees', '500 Rupees']
        
        if random.random() > 0.3:  # 70% chance to detect something
            return {
                'detected': True,
                'currency': random.choice(currencies),
                'confidence': round(random.uniform(75, 95), 1),
                'mode': 'simulation'
            }
        else:
            return {
                'detected': False,
                'currency': 'No currency detected',
                'confidence': 0,
                'mode': 'simulation'
            }

# Create single instance
detector = CurrencyDetector()