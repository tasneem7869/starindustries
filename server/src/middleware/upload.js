import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsRoot);
  },
  filename: function (_req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-');
    cb(null, `${timestamp}-${base}${ext}`);
  }
});

export const upload = multer({ storage });
