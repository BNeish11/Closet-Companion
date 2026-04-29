// Placeholder for image preprocessing and model inference
export async function preprocessImage(imageUri) {
  // resize, normalize, etc. Implement on-device using TFLite or ONNX
  return { uri: imageUri };
}

export async function classifyImage(preprocessed) {
  // Return example tags until model integrated
  return {
    category: 'top',
    color: 'blue',
    confidence: 0.8
  };
}
