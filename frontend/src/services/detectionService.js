let model = null;

// Detect objects in an image file using coco-ssd
export const detectObjects = async (imageFile) => {
    return new Promise((resolve, reject) => { 
        const reader = new FileReader();

        reader.onload = async (event) => { 
            if (!event.target?.result) {
                reject(new Error("No image found"));
                return;
            }
            try {
                // Create an image element for detection
                const img = new Image();
                img.crossOrigin = "anonymous";

                img.onload = async () => { 
                    try {
                        // Load the model
                        if (!model) {
                            const tf = await import("@tensorflow/tfjs");
                            const cocoSsd = await import("@tensorflow-models/coco-ssd");

                            console.log("Loading COCO-SSD model...");
                            model = await cocoSsd.load();
                            console.log("Model loaded successfully");
                        }

                        // Perform detection
                        const predictions = await model.detect(img);
                        
                        // Convert predictions to simpler format
                        const detections = predictions.map((pred) => {
                            const [x, y, width, height] = pred.bbox;
                            return {
                                class: pred.class,
                                confidence: pred.score,
                                bbox: [x, y, width, height],
                            };
                        });
                        
                        resolve(detections);
                    } catch (error) {
                        console.error("Error during detection:", error);
                        reject(new Error("Failed to perform object detection"));
                    }
                };

                img.onerror = () => {
                    reject(new Error("Failed to load image for detection"));
                };

                // Set the image source to the file data
                img.src = event.target.result;
            } catch (error) {
                console.error("Error setting up detection:", error);
                reject(new Error("Error setting up object detection"));
            }
        };

        reader.onerror = () => {
            reject(new Error("Failed to read the image file"));
        };

        reader.readAsDataURL(imageFile);
    });
};