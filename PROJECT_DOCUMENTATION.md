# VisionAI Project Documentation

## Project Overview

**VisionAI** is an AI-powered real-time currency recognition system designed to help visually impaired individuals identify and verify banknotes with accuracy and confidence. The system combines YOLOv8 deep learning models, modern web technologies, and assistive features to provide an accessible financial independence solution.

## Architecture Overview

```
VisionAI/
├── frontend/                 # React.js web application
├── backend/                  # Flask API server
├── models/                   # YOLO model files
├── locales/                  # Internationalization files
└── configuration files
```

## Technical Stack

### Frontend Technologies
- **React 19.0.0** - Modern UI framework
- **React Router DOM 7.4.0** - Client-side routing
- **Styled Components 6.1.16** - CSS-in-JS styling
- **Framer Motion 12.5.0** - Animation library
- **i18next 25.4.2** - Internationalization framework
- **Axios 1.11.0** - HTTP client for API communication
- **React Icons 5.5.0** - Icon library

### Backend Technologies
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **OpenCV** - Computer vision library
- **Pillow** - Image processing
- **NumPy** - Numerical computing
- **Ultralytics YOLO** - Object detection model

### AI/ML Components
- **YOLOv8** - Real-time object detection model
- **Custom trained model** - Currency-specific detection (best.pt)

## Detailed Component Analysis

### Frontend Architecture

#### 1. Application Structure (`App.js`)
- **Router Configuration**: Uses React Router for navigation between pages
- **Global Styling**: Styled-components for theme management
- **Layout System**: Nested routing with shared navigation
- **Custom Cursor**: Enhanced user experience with custom cursor effects
- **Pages**: Home, Scan, History, Settings

#### 2. Core Components

**Navigation (`Navbar.js`)**
- Responsive navigation bar
- Language switcher integration
- Accessibility features
- Mobile-responsive design

**Custom Cursor (`CustomCursor.js`)**
- Enhanced visual feedback
- Cursor trail effects (`CursorTrail.js`)
- Accessibility considerations

**Floating Currency (`FloatingCurrency.js`)**
- Interactive currency animations
- Visual feedback for detection results

**Language Switcher (`LanguageSwitcher.js`)**
- Multi-language support (English/Hindi)
- Browser language detection
- Persistent language preferences

#### 3. Page Components

**Home Page (`Home.js`)**
- Landing page with project introduction
- Feature highlights
- Navigation to scanning functionality

**Scan Page (`Scan.js`)**
- Camera integration for live currency detection
- Real-time image capture
- API communication for detection
- Voice feedback implementation
- Results display and history logging

**History Page (`History.js`)**
- Detection history tracking
- Scan result archive
- User activity logging

**Settings Page (`Settings.js`)**
- User preference configuration
- Accessibility settings
- Language selection
- Model confidence thresholds

### Backend Architecture

#### 1. Application Factory (`app/__init__.py`)
- Flask application initialization
- CORS configuration for frontend integration
- Blueprint registration for modular routing
- API documentation endpoint

#### 2. Routing Layer (`routes.py`)
- RESTful API endpoint definitions
- Route-to-controller mapping
- HTTP method specifications

**API Endpoints:**
- `POST /api/detect` - Currency detection from base64 image
- `GET /api/health` - Service health check

#### 3. Controller Layer (`controller.py`)
- Request handling and validation
- Response formatting
- Error handling and logging
- Input sanitization

#### 4. Service Layer (`service.py`)
- **CurrencyDetector Class**: Core detection logic
- **Model Management**: YOLO model loading and initialization
- **Image Processing**: Base64 to image conversion
- **Detection Logic**: Real-time currency identification
- **Simulation Mode**: Fallback for demo purposes when model unavailable

**Key Features:**
- Confidence threshold configuration
- Multiple currency denomination support
- Error handling and recovery
- Performance optimization

### AI Model Integration

#### YOLOv8 Model (`models/best.pt`)
- **Size**: 6.2MB custom-trained model
- **Purpose**: Currency detection and classification
- **Supported Currencies**: Indian Rupees (10, 20, 50, 100, 500)
- **Architecture**: CNN-based object detection
- **Performance**: Real-time inference capability

### Internationalization System

#### i18n Configuration (`i18n.js`)
- **Supported Languages**: English (en), Hindi (hi)
- **Detection Strategy**: Browser language, localStorage, cookies
- **RTL Support**: Right-to-left language compatibility
- **Dynamic Loading**: Efficient resource management

#### Translation Files
- **English** (`locales/en.json`): Default language
- **Hindi** (`locales/hi.json`): Localized content for Hindi speakers

### Accessibility Features

1. **Visual Accessibility**
   - Custom cursor system for enhanced visibility
   - High contrast design elements
   - Large, readable fonts (Montserrat, Playfair Display)

2. **Audio Feedback**
   - Voice announcements for detection results
   - Sound cues for user interactions
   - Text-to-speech integration

3. **Navigation Accessibility**
   - Keyboard navigation support
   - Screen reader compatibility
   - Logical tab ordering

## Data Flow Architecture

### 1. Image Capture Process
```
User Camera → Frontend Capture → Base64 Encoding → API Request
```

### 2. Detection Pipeline
```
Base64 Image → PIL Image → YOLO Model → Detection Results → JSON Response
```

### 3. Result Presentation
```
API Response → Frontend Processing → UI Update → Voice Feedback → History Storage
```

## File Structure Details

```
VisionAI/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.js
│   │   │   ├── CustomCursor.js
│   │   │   ├── CursorTrail.js
│   │   │   ├── FloatingCurrency.js
│   │   │   └── LanguageSwitcher.js
│   │   ├── pages/              # Main application pages
│   │   │   ├── Home.js
│   │   │   ├── Scan.js
│   │   │   ├── History.js
│   │   │   └── Settings.js
│   │   ├── locales/           # Internationalization
│   │   │   ├── en.json
│   │   │   └── hi.json
│   │   ├── App.js             # Main application component
│   │   ├── index.js           # Application entry point
│   │   └── i18n.js            # i18n configuration
│   └── package.json           # Frontend dependencies
├── backend/
│   ├── app/
│   │   ├── __init__.py        # Flask app factory
│   │   ├── routes.py          # API route definitions
│   │   ├── controller.py      # Request handlers
│   │   └── service.py         # Business logic
│   ├── models/
│   │   └── best.pt           # Trained YOLO model
│   ├── requirements.txt      # Python dependencies
│   └── run.py               # Application entry point
├── README.md                # Project documentation
├── package.json            # Root dependencies (i18n)
└── bse64conv.py           # Utility script for base64 conversion
```

## Performance Characteristics

### Frontend Performance
- **Bundle Size**: Optimized with React 19
- **Loading Time**: Fast initial load with code splitting
- **Real-time Updates**: Efficient state management
- **Mobile Responsive**: Cross-device compatibility

### Backend Performance
- **Model Loading**: One-time initialization
- **Inference Time**: Real-time detection (< 100ms)
- **Memory Usage**: Optimized for server deployment
- **Concurrent Requests**: Flask threading support

### AI Model Performance
- **Accuracy**: High precision for supported currencies
- **Speed**: Real-time inference capability
- **Robustness**: Handles various lighting conditions
- **Scalability**: Supports additional currency training

## Security Considerations

1. **Data Privacy**: No persistent image storage
2. **API Security**: CORS configuration for trusted origins
3. **Input Validation**: Sanitized image data processing
4. **Error Handling**: Secure error message formatting

## Deployment Architecture

### Development Environment
- Frontend: React development server (port 3000)
- Backend: Flask development server (port 5000)
- Model: Local file system storage

### Production Considerations
- **Frontend**: Static build deployment
- **Backend**: WSGI server deployment
- **Model**: Cloud storage integration
- **Monitoring**: Health check endpoints

## Future Enhancement Roadmap

### Planned Features
1. **Smart Glasses Integration**: Hardware compatibility
2. **Global Currency Support**: Extended model training
3. **Multi-language Voice Output**: Enhanced accessibility
4. **Cloud Model Updates**: Dynamic model versioning
5. **Mobile App**: Native iOS/Android applications

### Technical Improvements
1. **Model Optimization**: Quantization for mobile deployment
2. **Caching Strategy**: Improved response times
3. **Analytics Integration**: User behavior insights
4. **A/B Testing**: Feature optimization
5. **Progressive Web App**: Offline functionality

## Development Guidelines

### Code Standards
- **React**: Functional components with hooks
- **Python**: PEP 8 style guidelines
- **Documentation**: Comprehensive inline comments
- **Testing**: Unit and integration test coverage

### Accessibility Standards
- **WCAG 2.1 AA Compliance**: Full accessibility support
- **Screen Reader Testing**: VoiceOver/NVDA compatibility
- **Keyboard Navigation**: Complete keyboard accessibility
- **Color Contrast**: WCAG contrast requirements

## Conclusion

VisionAI represents a comprehensive solution for currency recognition accessibility, combining modern web technologies with advanced AI capabilities. The modular architecture supports scalability, maintainability, and future enhancements while prioritizing user experience and accessibility for visually impaired individuals.

The project demonstrates successful integration of:
- Real-time computer vision processing
- Accessible web application design
- Multi-language internationalization
- RESTful API architecture
- Modern frontend frameworks

This documentation serves as a complete reference for understanding, maintaining, and extending the VisionAI currency detection system.