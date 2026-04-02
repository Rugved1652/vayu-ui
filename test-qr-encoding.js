// Quick test of QR encoding
const testValue = 'https://vayu-ui.com';

// Simulate the encodeQR function result
// For a URL like "https://vayu-ui.com" (21 chars), with level "M"
// Expected: QR version 2 or 3, matrix size ~25x27 modules

console.log('Testing QR encoding for:', testValue);
console.log('Expected output: A valid QR matrix with ~25-27 rows/columns');
console.log('Each cell should be true (black) or false (white)');
console.log('');

// The actual encodeQR function should return a boolean matrix
// For verification, let's check what the matrix should look like:
// - Should be a square array (same number of rows and columns)
// - Should have finder patterns in 3 corners (top-left, top-right, bottom-left)
// - Should have timing patterns
// - Should have data modules encoded in the rest

console.log('If the QR code is not scanning, check:');
console.log('1. Matrix size: should be 21, 25, 29, etc. (always 4n + 17)');
console.log('2. Finder patterns: 3x7x7 squares in corners');
console.log('3. Contrast: black on white (or dark on light)');
console.log('4. ViewBox: should match matrix size + margin*2');
console.log('5. Module positioning: x = c + margin, y = r + margin');
