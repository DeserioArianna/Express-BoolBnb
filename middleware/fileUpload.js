const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../public/images");

// Verifica se la cartella esiste, altrimenti la crea
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Cartella creata: ${uploadDir}`);
} else {
    console.log(`Cartella esistente: ${uploadDir}`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`Salvataggio file in: ${uploadDir}`);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const originalFilename = file.originalname;
        const uniqueName = `${Date.now()}-${originalFilename}`;
        console.log(`Nome file generato: ${uniqueName}`);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limite di 5MB per i file
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Tipo di file non supportato'), false);
        }
    }
}).single('url_img'); // Cambia 'file' in 'url_img'

const uploadMiddleware = (req, res, next) => {
    console.log("Inizio upload del file");
    console.log("Contenuto della richiesta:", req.body);
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error("Errore Multer:", err.message);
            return res.status(400).json({ error: err.message });
        } else if (err) {
            console.error("Errore durante l'upload:", err.message);
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            console.error("Nessun file caricato");
            return res.status(400).json({ error: "Nessun file caricato" });
        }

        console.log("File caricato con successo");
        console.log("File salvato in:", req.file.path);

        // Aggiungi il percorso del file ai dati del modulo
        req.body.url_img = req.file.filename;

        next();
    });
};

module.exports = uploadMiddleware;