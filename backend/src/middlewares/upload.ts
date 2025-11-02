import multer from 'multer';

// store files temporarily in memory
const storage = multer.memoryStorage();
export const upload = multer({ storage });
