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

export const MONTHS_STR = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

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
    let temp = months[month];
    return temp ? temp : "0";
}

/**
 * Dark input textfield custom style
 */
export const darkFieldSx = {
    "& .MuiInputBase-root": {
        borderRadius: "15px",
        backgroundColor: "rgb(20, 20, 20)",
        color: "rgb(214, 214, 214)",
        border: "0.5px solid rgb(66, 66, 66)",
    },
    "& .MuiInputBase-input": {
        padding: "15px",
    },
    "& .MuiInputLabel-root": {
        color: "rgb(160, 160, 160)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "rgb(214, 214, 214)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // important: remove the default outline
    },
    "& .MuiOutlinedInput-root:hover": {
        borderColor: "rgb(120, 120, 120)",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
        boxShadow: "0 0 0 2px rgba(255,255,255,0.08)",
    },
};