const { validationResult } = require("express-validator");

//Middleware per gestire gli errori di validazione
const validateInputs = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "fail",
            message: "Errore di validazione",
            errors: errors.array(),
        });
    }
    next();
};

//Middleware per gestire errori generici
const errorHandler = (err, req, res, next) => {
    console.error("Errore interno del server:", err);

    res.status(500).json({
        status: "fail",
        message: "Errore interno del server",
        detail: err.message,
    });
};

//Esportiamo i middleware
module.exports = { validateInputs, errorHandler };