"use client";
import React, { useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { forwardRef, HTMLAttributes } from "react";

// ─── QR Code Encoding Engine ──────────────────────────────────────────────────
// Pure TypeScript implementation of QR code generation (byte mode).

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

// Error correction codewords per block for versions 1-40 and each EC level
const EC_CODEWORDS_PER_BLOCK: Record<ErrorCorrectionLevel, number[]> = {
    L: [7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    M: [10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    Q: [13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    H: [17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
};

// Number of error correction blocks for each version and level
const NUM_EC_BLOCKS: Record<ErrorCorrectionLevel, number[]> = {
    L: [1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    M: [1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    Q: [1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    H: [1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
};

// Total number of codewords (data + EC) for each version
const TOTAL_CODEWORDS: number[] = [
    26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
    1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876,
    3034, 3196, 3362, 3532, 3706,
];

// Data codeword capacity for each version and level
function getDataCodewords(version: number, level: ErrorCorrectionLevel): number {
    const totalCW = TOTAL_CODEWORDS[version - 1]!;
    const ecCWPerBlock = EC_CODEWORDS_PER_BLOCK[level][version - 1]!;
    const numBlocks = NUM_EC_BLOCKS[level][version - 1]!;
    return totalCW - ecCWPerBlock * numBlocks;
}

// Determine the smallest version that can hold the data
function getMinVersion(dataLength: number, level: ErrorCorrectionLevel): number {
    for (let v = 1; v <= 40; v++) {
        const dataCW = getDataCodewords(v, level);
        // Byte mode: 4 bits mode + char count bits + 8 bits per char + terminator
        const charCountBits = v <= 9 ? 8 : 16;
        const availableBits = dataCW * 8;
        const requiredBits = 4 + charCountBits + dataLength * 8;
        if (requiredBits <= availableBits) return v;
    }
    return 40;
}

// ─── Galois Field GF(256) arithmetic ─────────────────────────────────────────
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

(function initGF() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
        GF_EXP[i] = x;
        GF_LOG[x] = i;
        x = (x << 1) ^ (x & 0x80 ? 0x11d : 0);
    }
    for (let i = 255; i < 512; i++) {
        GF_EXP[i] = GF_EXP[i - 255]!;
    }
})();

function gfMul(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return GF_EXP[(GF_LOG[a]! + GF_LOG[b]!) % 255]!;
}

// Generate Reed-Solomon error correction codewords
function rsEncode(data: Uint8Array, ecCount: number): Uint8Array {
    // Build generator polynomial
    let gen = new Uint8Array([1]);
    for (let i = 0; i < ecCount; i++) {
        const newGen = new Uint8Array(gen.length + 1);
        for (let j = 0; j < gen.length; j++) {
            newGen[j] ^= gen[j]!;
            newGen[j + 1] ^= gfMul(gen[j]!, GF_EXP[i]!);
        }
        gen = newGen;
    }

    const result = new Uint8Array(ecCount);
    const msg = new Uint8Array(data.length + ecCount);
    msg.set(data);

    for (let i = 0; i < data.length; i++) {
        const coef = msg[i]!;
        if (coef !== 0) {
            for (let j = 0; j < gen.length; j++) {
                msg[i + j] ^= gfMul(gen[j]!, coef);
            }
        }
    }

    for (let i = 0; i < ecCount; i++) {
        result[i] = msg[data.length + i]!;
    }
    return result;
}

// ─── Module placement ─────────────────────────────────────────────────────────

// Alignment pattern positions for each version
const ALIGNMENT_POSITIONS: number[][] = [
    [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
    [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62],
    [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86],
    [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166],
];

function createMatrix(version: number): { modules: boolean[][]; isFunction: boolean[][] } {
    const size = version * 4 + 17;
    const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false) as boolean[]);
    const isFunction: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false) as boolean[]);

    // Finder patterns
    const setFinderPattern = (row: number, col: number) => {
        for (let r = -1; r <= 7; r++) {
            for (let c = -1; c <= 7; c++) {
                const rr = row + r;
                const cc = col + c;
                if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
                isFunction[rr]![cc] = true;
                if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
                    modules[rr]![cc] =
                        r === 0 || r === 6 || c === 0 || c === 6 ||
                        (r >= 2 && r <= 4 && c >= 2 && c <= 4);
                }
            }
        }
    };

    setFinderPattern(0, 0);
    setFinderPattern(0, size - 7);
    setFinderPattern(size - 7, 0);

    // Alignment patterns
    if (version >= 2) {
        const positions = ALIGNMENT_POSITIONS[version - 1]!;
        for (const row of positions) {
            for (const col of positions) {
                // Skip if overlapping with finder patterns
                if (
                    (row <= 8 && col <= 8) ||
                    (row <= 8 && col >= size - 8) ||
                    (row >= size - 8 && col <= 8)
                ) continue;

                for (let r = -2; r <= 2; r++) {
                    for (let c = -2; c <= 2; c++) {
                        isFunction[row + r]![col + c] = true;
                        modules[row + r]![col + c] =
                            Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
                    }
                }
            }
        }
    }

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
        isFunction[7]![i] = true;
        modules[7]![i] = i % 2 === 0;
        isFunction[i]![7] = true;
        modules[i]![7] = i % 2 === 0;
    }

    // Dark module
    isFunction[size - 8]![8] = true;
    modules[size - 8]![8] = true;

    // Reserve format info areas
    for (let i = 0; i < 9; i++) {
        if (i < size) { isFunction[8]![i] = true; isFunction[i]![8] = true; }
    }
    for (let i = 0; i < 8; i++) {
        isFunction[8]![size - 1 - i] = true;
        isFunction[size - 1 - i]![8] = true;
    }

    // Reserve version info areas (version >= 7)
    if (version >= 7) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 3; j++) {
                isFunction[i]![size - 11 + j] = true;
                isFunction[size - 11 + j]![i] = true;
            }
        }
    }

    return { modules, isFunction };
}

// Place data bits into the matrix
function placeDataBits(
    modules: boolean[][],
    isFunction: boolean[][],
    data: boolean[]
) {
    const size = modules.length;
    let bitIdx = 0;
    // Columns from right to left, in pairs
    for (let right = size - 1; right >= 1; right -= 2) {
        if (right === 6) right = 5; // Skip timing column
        for (let vert = 0; vert < size; vert++) {
            for (let j = 0; j < 2; j++) {
                const col = right - j;
                // Determine row based on direction
                const upward = ((right + 1) & 2) === 0;
                const row = upward ? size - 1 - vert : vert;
                if (!isFunction[row]![col] && bitIdx < data.length) {
                    modules[row]![col] = data[bitIdx]!;
                    bitIdx++;
                }
            }
        }
    }
}

// ─── Masking ──────────────────────────────────────────────────────────────────

const MASK_FUNCTIONS: ((row: number, col: number) => boolean)[] = [
    (r, c) => (r + c) % 2 === 0,
    (r) => r % 2 === 0,
    (_, c) => c % 3 === 0,
    (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    (r, c) => ((r * c) % 2 + (r * c) % 3) === 0,
    (r, c) => ((r * c) % 2 + (r * c) % 3) % 2 === 0,
    (r, c) => ((r + c) % 2 + (r * c) % 3) % 2 === 0,
];

function applyMask(
    modules: boolean[][],
    isFunction: boolean[][],
    maskIndex: number
): boolean[][] {
    const size = modules.length;
    const result = modules.map(row => [...row]);
    const maskFn = MASK_FUNCTIONS[maskIndex]!;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (!isFunction[r]![c]) {
                result[r]![c] = result[r]![c]! !== maskFn(r, c);
            }
        }
    }
    return result;
}

// ─── Format & Version info ───────────────────────────────────────────────────

const FORMAT_INFO_MASK = 0x5412;
const EC_LEVEL_BITS: Record<ErrorCorrectionLevel, number> = { L: 1, M: 0, Q: 3, H: 2 };

function getFormatBits(level: ErrorCorrectionLevel, mask: number): number {
    let data = (EC_LEVEL_BITS[level] << 3) | mask;
    let rem = data;
    for (let i = 0; i < 10; i++) {
        rem = (rem << 1) ^ ((rem >> 9) * 0x537);
    }
    return ((data << 10) | rem) ^ FORMAT_INFO_MASK;
}

function placeFormatBits(modules: boolean[][], level: ErrorCorrectionLevel, mask: number) {
    const size = modules.length;
    const bits = getFormatBits(level, mask);

    // Top-left
    for (let i = 0; i <= 5; i++) modules[8]![i] = ((bits >> i) & 1) === 1;
    modules[8]![7] = ((bits >> 6) & 1) === 1;
    modules[8]![8] = ((bits >> 7) & 1) === 1;
    modules[7]![8] = ((bits >> 8) & 1) === 1;
    for (let i = 9; i < 15; i++) modules[14 - i]![8] = ((bits >> i) & 1) === 1;

    // Top-right and bottom-left
    for (let i = 0; i < 8; i++) modules[8]![size - 1 - i] = ((bits >> i) & 1) === 1;
    for (let i = 8; i < 15; i++) modules[size - 15 + i]![8] = ((bits >> i) & 1) === 1;
}

function getVersionBits(version: number): number {
    let rem = version;
    for (let i = 0; i < 12; i++) {
        rem = (rem << 1) ^ ((rem >> 11) * 0x1f25);
    }
    return (version << 12) | rem;
}

function placeVersionBits(modules: boolean[][], version: number) {
    if (version < 7) return;
    const size = modules.length;
    const bits = getVersionBits(version);
    for (let i = 0; i < 18; i++) {
        const bit = ((bits >> i) & 1) === 1;
        const row = Math.floor(i / 3);
        const col = size - 11 + (i % 3);
        modules[row]![col] = bit;
        modules[col]![row] = bit;
    }
}

// ─── Penalty scoring ──────────────────────────────────────────────────────────

function calculatePenalty(modules: boolean[][]): number {
    const size = modules.length;
    let penalty = 0;

    // Rule 1: runs of same color
    for (let r = 0; r < size; r++) {
        let count = 1;
        for (let c = 1; c < size; c++) {
            if (modules[r]![c] === modules[r]![c - 1]) {
                count++;
                if (count === 5) penalty += 3;
                else if (count > 5) penalty += 1;
            } else {
                count = 1;
            }
        }
    }
    for (let c = 0; c < size; c++) {
        let count = 1;
        for (let r = 1; r < size; r++) {
            if (modules[r]![c] === modules[r - 1]![c]) {
                count++;
                if (count === 5) penalty += 3;
                else if (count > 5) penalty += 1;
            } else {
                count = 1;
            }
        }
    }

    // Rule 2: 2×2 blocks
    for (let r = 0; r < size - 1; r++) {
        for (let c = 0; c < size - 1; c++) {
            const val = modules[r]![c];
            if (val === modules[r]![c + 1] && val === modules[r + 1]![c] && val === modules[r + 1]![c + 1]) {
                penalty += 3;
            }
        }
    }

    // Rule 3: finder-like patterns
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size - 6; c++) {
            if (
                modules[r]![c] && !modules[r]![c + 1] && modules[r]![c + 2] &&
                modules[r]![c + 3] && modules[r]![c + 4] && !modules[r]![c + 5] &&
                modules[r]![c + 6]
            ) {
                const before = c >= 4 &&
                    !modules[r]![c - 1] && !modules[r]![c - 2] &&
                    !modules[r]![c - 3] && !modules[r]![c - 4];
                const after = c + 10 < size &&
                    !modules[r]![c + 7] && !modules[r]![c + 8] &&
                    !modules[r]![c + 9] && !modules[r]![c + 10];
                if (before || after) penalty += 40;
            }
        }
    }
    for (let c = 0; c < size; c++) {
        for (let r = 0; r < size - 6; r++) {
            if (
                modules[r]![c] && !modules[r + 1]![c] && modules[r + 2]![c] &&
                modules[r + 3]![c] && modules[r + 4]![c] && !modules[r + 5]![c] &&
                modules[r + 6]![c]
            ) {
                const before = r >= 4 &&
                    !modules[r - 1]![c] && !modules[r - 2]![c] &&
                    !modules[r - 3]![c] && !modules[r - 4]![c];
                const after = r + 10 < size &&
                    !modules[r + 7]![c] && !modules[r + 8]![c] &&
                    !modules[r + 9]![c] && !modules[r + 10]![c];
                if (before || after) penalty += 40;
            }
        }
    }

    // Rule 4: dark/light balance
    let darkCount = 0;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (modules[r]![c]) darkCount++;
        }
    }
    const total = size * size;
    const pct = (darkCount / total) * 100;
    const prev5 = Math.floor(pct / 5) * 5;
    const next5 = prev5 + 5;
    penalty += Math.min(Math.abs(prev5 - 50) / 5, Math.abs(next5 - 50) / 5) * 10;

    return penalty;
}

// ─── Main encode function ─────────────────────────────────────────────────────

function encodeQR(text: string, level: ErrorCorrectionLevel): boolean[][] {
    const dataBytes = new TextEncoder().encode(text);
    const version = getMinVersion(dataBytes.length, level);
    const dataCW = getDataCodewords(version, level);
    const charCountBits = version <= 9 ? 8 : 16;

    // Build bit stream
    const bits: boolean[] = [];
    const pushBits = (val: number, len: number) => {
        for (let i = len - 1; i >= 0; i--) bits.push(((val >> i) & 1) === 1);
    };

    // Mode indicator: byte mode = 0100
    pushBits(0b0100, 4);
    // Character count
    pushBits(dataBytes.length, charCountBits);
    // Data
    for (const byte of dataBytes) pushBits(byte, 8);
    // Terminator (up to 4 zeros)
    const maxBits = dataCW * 8;
    for (let i = 0; i < 4 && bits.length < maxBits; i++) bits.push(false);
    // Pad to byte boundary
    while (bits.length % 8 !== 0) bits.push(false);
    // Pad codewords
    const padBytes = [0xEC, 0x11];
    let padIdx = 0;
    while (bits.length < maxBits) {
        pushBits(padBytes[padIdx % 2]!, 8);
        padIdx++;
    }

    // Convert bits to codeword bytes
    const codewords = new Uint8Array(dataCW);
    for (let i = 0; i < dataCW; i++) {
        let byte = 0;
        for (let j = 0; j < 8; j++) {
            byte = (byte << 1) | (bits[i * 8 + j] ? 1 : 0);
        }
        codewords[i] = byte;
    }

    // Split into blocks and generate EC
    const ecCWPerBlock = EC_CODEWORDS_PER_BLOCK[level][version - 1]!;
    const numBlocks = NUM_EC_BLOCKS[level][version - 1]!;
    const totalDataCW = dataCW;

    const shortBlockDataCW = Math.floor(totalDataCW / numBlocks);
    const longBlockCount = totalDataCW % numBlocks;
    const shortBlockCount = numBlocks - longBlockCount;

    const dataBlocks: Uint8Array[] = [];
    const ecBlocks: Uint8Array[] = [];
    let offset = 0;

    for (let i = 0; i < numBlocks; i++) {
        const blockLen = i < shortBlockCount ? shortBlockDataCW : shortBlockDataCW + 1;
        const block = codewords.slice(offset, offset + blockLen);
        offset += blockLen;
        dataBlocks.push(block);
        ecBlocks.push(rsEncode(block, ecCWPerBlock));
    }

    // Interleave
    const interleaved: number[] = [];
    const maxDataLen = shortBlockDataCW + 1;
    for (let i = 0; i < maxDataLen; i++) {
        for (const block of dataBlocks) {
            if (i < block.length) interleaved.push(block[i]!);
        }
    }
    for (let i = 0; i < ecCWPerBlock; i++) {
        for (const block of ecBlocks) {
            interleaved.push(block[i]!);
        }
    }

    // Convert to bit stream
    const dataBits: boolean[] = [];
    for (const byte of interleaved) {
        for (let j = 7; j >= 0; j--) dataBits.push(((byte >> j) & 1) === 1);
    }
    // Remainder bits
    const remainderBits = [0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0];
    for (let i = 0; i < (remainderBits[version - 1] ?? 0); i++) dataBits.push(false);

    // Build matrix
    const { modules, isFunction } = createMatrix(version);
    placeDataBits(modules, isFunction, dataBits);

    // Find best mask
    let bestMask = 0;
    let bestPenalty = Infinity;
    for (let mask = 0; mask < 8; mask++) {
        const masked = applyMask(modules, isFunction, mask);
        placeFormatBits(masked, level, mask);
        placeVersionBits(masked, version);
        const penalty = calculatePenalty(masked);
        if (penalty < bestPenalty) {
            bestPenalty = penalty;
            bestMask = mask;
        }
    }

    // Apply best mask
    const finalModules = applyMask(modules, isFunction, bestMask);
    placeFormatBits(finalModules, level, bestMask);
    placeVersionBits(finalModules, version);

    return finalModules;
}

// ─── React Component ──────────────────────────────────────────────────────────

const qrcodeVariants = cva("inline-block", {
    variants: {
        size: {
            sm: "",
            md: "",
            lg: "",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface QRCodeImageSettings {
    /** URL of the center logo image */
    src: string;
    /** Width of the logo in pixels */
    width: number;
    /** Height of the logo in pixels */
    height: number;
    /** Clear modules behind the logo for readability */
    excavate?: boolean;
}

export interface QRCodeProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof qrcodeVariants> {
    /** Data to encode in the QR code */
    value: string;
    /** Width & height in pixels (default 200) */
    qrSize?: number;
    /** Error correction level (default "M") */
    level?: ErrorCorrectionLevel;
    /** Background color (uses design token by default) */
    bgColor?: string;
    /** Foreground / module color (uses design token by default) */
    fgColor?: string;
    /** Add quiet-zone margin (default true) */
    includeMargin?: boolean;
    /** Center logo overlay */
    imageSettings?: QRCodeImageSettings;
}

const sizeMap = {
    sm: 128,
    md: 200,
    lg: 300,
} as const;

const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(
    (
        {
            value,
            size = "md",
            qrSize,
            level = "M",
            bgColor,
            fgColor,
            includeMargin = true,
            imageSettings,
            className,
            "aria-label": ariaLabel,
            ...props
        },
        ref
    ) => {
        const computedSize = qrSize ?? sizeMap[size ?? "md"];

        // Default colors using CSS custom properties that map to design tokens
        // Falls back to sensible defaults for QR scannability
        const resolvedBgColor = bgColor ?? "var(--color-ground-50, #fafafa)";
        const resolvedFgColor = fgColor ?? "var(--color-ground-950, #09090b)";

        const { cells, numCells } = useMemo(() => {
            if (!value) return { cells: [] as boolean[][], numCells: 0 };
            const matrix = encodeQR(value, level);
            return { cells: matrix, numCells: matrix.length };
        }, [value, level]);

        const margin = includeMargin ? 4 : 0;
        const viewBoxSize = numCells + margin * 2;
        const cellSize = 1;

        // Determine which cells to excavate (clear) for the center logo
        // Must be called before any early returns to satisfy Rules of Hooks
        const excavatedCells = useMemo(() => {
            if (!imageSettings?.excavate || numCells === 0) return new Set<string>();
            const imgW = (imageSettings.width / computedSize) * viewBoxSize;
            const imgH = (imageSettings.height / computedSize) * viewBoxSize;
            const startX = Math.floor((viewBoxSize - imgW) / 2) - margin;
            const startY = Math.floor((viewBoxSize - imgH) / 2) - margin;
            const endX = Math.ceil(startX + imgW);
            const endY = Math.ceil(startY + imgH);

            const set = new Set<string>();
            for (let r = Math.max(0, startY); r < Math.min(numCells, endY); r++) {
                for (
                    let c = Math.max(0, startX);
                    c < Math.min(numCells, endX);
                    c++
                ) {
                    set.add(`${r},${c}`);
                }
            }
            return set;
        }, [imageSettings, computedSize, viewBoxSize, margin, numCells]);

        if (!value || numCells === 0) {
            return (
                <div
                    ref={ref}
                    className={clsx(
                        qrcodeVariants({ size }),
                        "inline-flex items-center justify-center bg-ground-100 dark:bg-ground-800 rounded",
                        className
                    )}
                    style={{ width: computedSize, height: computedSize }}
                    role="img"
                    aria-label={ariaLabel ?? "Empty QR code"}
                    {...props}
                >
                    <span className="text-ground-400 dark:text-ground-500 text-sm font-secondary">
                        No data
                    </span>
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={clsx(qrcodeVariants({ size }), className)}
                role="img"
                aria-label={ariaLabel ?? `QR code for: ${value}`}
                {...props}
            >
                <svg
                    width={computedSize}
                    height={computedSize}
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                    xmlns="http://www.w3.org/2000/svg"
                    shapeRendering="crispEdges"
                >
                    {/* Background */}
                    <rect
                        width={viewBoxSize}
                        height={viewBoxSize}
                        fill={resolvedBgColor}
                    />

                    {/* QR modules */}
                    {cells.map((row, r) =>
                        row.map((cell, c) => {
                            if (!cell) return null;
                            if (excavatedCells.has(`${r},${c}`)) return null;
                            return (
                                <rect
                                    key={`${r}-${c}`}
                                    x={c + margin}
                                    y={r + margin}
                                    width={cellSize}
                                    height={cellSize}
                                    fill={resolvedFgColor}
                                />
                            );
                        })
                    )}

                    {/* Center logo */}
                    {imageSettings && (
                        <image
                            href={imageSettings.src}
                            x={
                                (viewBoxSize -
                                    (imageSettings.width / computedSize) *
                                    viewBoxSize) /
                                2
                            }
                            y={
                                (viewBoxSize -
                                    (imageSettings.height / computedSize) *
                                    viewBoxSize) /
                                2
                            }
                            width={
                                (imageSettings.width / computedSize) * viewBoxSize
                            }
                            height={
                                (imageSettings.height / computedSize) * viewBoxSize
                            }
                            preserveAspectRatio="xMidYMid meet"
                        />
                    )}
                </svg>
            </div>
        );
    }
);

QRCode.displayName = "QRCode";

export { QRCode };