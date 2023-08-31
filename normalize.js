function convertToNormalMap() {
    const input = document.getElementById('imageInput');
    const originalImage = document.getElementById('originalImage');
    const normalMapCanvas = document.getElementById('normalMapCanvas');
    const ctx = normalMapCanvas.getContext('2d');

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        originalImage.src = e.target.result;

        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            // Display the original image
            ctx.drawImage(img, 0, 0);

            // Generate a simple normal map (for demonstration purposes)
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const normalMap = generateSimpleNormalMap(imageData);

            // Display the generated normal map
            ctx.putImageData(normalMap, 0, 0);
        };
    };

    reader.readAsDataURL(file);
}

function generateSimpleNormalMap(imageData) {
    const { width, height, data } = imageData;
    const normalMapData = new Uint8ClampedArray(width * height * 4);

    // Calculate normals for each pixel (simplified example)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = data[i] / 255;
            const g = data[i + 1] / 255;
            const b = data[i + 2] / 255;

            const nx = 2.0 * r - 1.0;
            const ny = 2.0 * g - 1.0;
            const nz = b;

            // Convert the normal components to pixel values
            normalMapData[i] = (nx + 1.0) * 0.5 * 255;
            normalMapData[i + 1] = (ny + 1.0) * 0.5 * 255;
            normalMapData[i + 2] = (nz + 1.0) * 0.5 * 255;
            normalMapData[i + 3] = 255; // Alpha channel
        }
    }

    return new ImageData(normalMapData, width, height);
}