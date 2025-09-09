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

export function convertMonthIndex(month) {
    const months = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12,
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    }
    let temp = months[String(month)];
    return temp ? temp : "0";
}