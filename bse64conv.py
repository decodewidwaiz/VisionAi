import base64

with open("test.jpg", "rb") as img_file:
    print(base64.b64encode(img_file.read()).decode())
