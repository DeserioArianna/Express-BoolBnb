// const dbConnection = require("../dbConnection/dbConnecion")
const dbConnection = require("../dbConnection/dbConnection")

const index = (req, res, next) => {
    const sql = "SELECT * FROM casa"

    dbConnection.query(sql, (err, result) => {
        if (err) {
            return next(new Error("errore interno del server"))
        }
        return res.status(200).json({
            status: "success",
            data: result
        })
    });
};

const show = (req, res, next) => {
    const { id } = req.params;

    const sql = `SELECT * FROM casa WHERE id = ?`;

    dbConnection.query(sql, [id], (err, results) => {
        if (err) {
            return next(new Error("errore interno del server"))
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Immobile non trovato" });
        }
        return res.status(200).json({
            status: "success",
            data: results[0]
        })
    });
};

const store = (req, res, next) => {
    console.log("prova")
}


module.exports = {
    index,
    show,
}