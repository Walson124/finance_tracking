const generatedColors = new Set();

export function generateRandomPastelColor() {
    let color;
    do {
        // Generate random RGB values in the pastel range
        const r = Math.floor((Math.random() * 127) + 127); // 127-255
        const g = Math.floor((Math.random() * 127) + 127); // 127-255
        const b = Math.floor((Math.random() * 127) + 127); // 127-255

        // Convert to hex color
        color = `rgb(${r}, ${g}, ${b})`;
    } while (generatedColors.has(color)); // Ensure no repeats

    // Add the new color to the set
    generatedColors.add(color);

    return color;
}