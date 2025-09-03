import os
from app import create_app

app = create_app()

if __name__ == '__main__':
    print("🚀 Starting Currency Detection Server...")
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV') != 'production'
    app.run(debug=debug_mode, host='0.0.0.0', port=port)