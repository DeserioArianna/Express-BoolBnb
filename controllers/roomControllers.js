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

const postAppartemento = (req, res, next) => {
    const a = req.body

    const sql = `
    INSERT INTO boolbnb_db.casa ( id_utente, titolo_riepilogativo, 
    numero_di_stanze, url_img, numero_di_letti, 
    numero_di_bagni, metri_quadrati, indirizzo_completo, 
    email_di_riferimento, tipologia_immobile, likes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `

    dbConnection.query(sql, [a.id_utente, a.titolo_riepilogativo,
    a.numero_di_stanze, a.url_img, a.numero_di_letti,
    a.numero_di_bagni, a.metri_quadrati, a.indirizzo_completo,
    a.email_di_riferimento, a.tipologia_immobile, a.likes], (err, results) => {
        if (err) {
            return next(new Error("errore interno del server"))
        }
        return res.status(200).json({
            status: "success",
            data: results[0]
        })
    });
}

const addLike = (req, res, next) => {
    const { id } = req.params;

    const sql = `
    UPDATE boolbnb_db.casa
    SET likes = likes + 1
    where id = ?;`

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
}


module.exports = {
    index,
    show,
    store,
    addLike,
    postAppartemento
}