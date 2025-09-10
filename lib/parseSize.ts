export const parseSizeToMl = (size: string): number => {
        if (size.toLowerCase().includes("cl")) {
        return parseInt(size) * 10; // 1cl = 10ml
        }
        if (size.toLowerCase().includes("l")) {
        return parseFloat(size) * 1000; // 1L = 1000ml
        }
        return 0;
    };