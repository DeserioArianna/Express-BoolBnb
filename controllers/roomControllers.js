const dbConnection = require("../dbConnection/dbConnection")
const { body, validationResult, query } = require("express-validator")
const { validateInputs, errorHandler } = require("../middleware/errorsHandlers");

const index = (req, res, next) => {
    const sql = "SELECT * FROM house ORDER BY likes DESC"

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

const searchByCityValidation = [
    query("city").optional().isString().withMessage("La città deve essere una stringa"),
    query("bedrooms").optional().isInt({ min: 0 }).withMessage("Il numero di camere da letto deve essere un numero intero positivo"),
    query("bathrooms").optional().isInt({ min: 0 }).withMessage("Il numero di bagni deve essere un numero intero positivo"),
    query("id_property").optional().isInt({ min: 1, max: 4 }).withMessage("L'ID della proprietà deve essere un numero intero positivo"),
];

const searchByCity = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { city, bedrooms, bathrooms, id_property } = req.query;
    let filters = [];
    let values = [];

    if (city) {
        filters.push("city LIKE ?");
        values.push(`%${city}%`);
    }

    if (bedrooms) {
        filters.push("bedrooms <= ?");
        values.push(parseInt(bedrooms, 10));
    }

    if (bathrooms) {
        filters.push("bathrooms <= ?");
        values.push(parseInt(bathrooms, 10));
    }

    if (id_property) {
        filters.push("id_property = ?");
        values.push(parseInt(id_property, 10));
    }

    let sql = "SELECT * FROM house";

    if (filters.length > 0) {
        sql += " WHERE " + filters.join(" AND ");
    }

    sql += " ORDER BY likes DESC";

    console.log("SQL Query:", sql, "Values:", values); // Debug

    dbConnection.query(sql, values, (err, results) => {
        if (err) {
            console.error("Errore SQL:", err.sqlMessage, err.code);
            return res.status(500).json({ error: "Errore del server", details: err.sqlMessage });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Nessun appartamento trovato" });
        }

        return res.status(200).json({
            status: "success",
            data: results
        });
    });
};



const indexProperty = (req, res, next) => {
    const sql = "SELECT * FROM property"
    dbConnection.query(sql, (err, result) => {
        if (err) {
            return next(new Error("errore interno del server"))
        }
        return res.status(200).json({
            status: "success",
            data: result
        })
    })
}

const show = (req, res, next) => {
    const  slug  = req.params;

    const sql = `SELECT * FROM house WHERE slug = ?`;

    dbConnection.query(sql, [slug], (err, results) => {
        if (err) {
            console.error("Errore nella query SQL (house):", err);
            return res.status(500).json({ error: "Errore interno del server" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Immobile non trovato" });
        }

        const house = results[0];
        const houseId = house.id;

        const sqlReviews = `SELECT * FROM review WHERE id_house = ?`;

        dbConnection.query(sqlReviews, [houseId], (err, reviews) => {
            if (err) {
                console.error("Errore nella query SQL (reviews):", err);
                return res.status(500).json({ error: "Errore interno del server" });
            }

            return res.status(200).json({
                status: "success",
                data: {
                    ...house,
                    reviews
                }
            });
        });
    });
};


const store = (req, res, next) => {
    console.log("prova")
}

const postAppartemento = [
    body("id_property").isInt().withMessage("id_property deve essere un numero intero"),
    body("title").isString().isLength({ min: 3, max: 255 }).withMessage("Il titolo deve avere tra 3 e 255 caratteri"),
    body("city").isString().isLength({ min: 2, max: 100 }).withMessage("La città deve avere tra 2 e 100 caratteri"),
    body("descr").isString().optional({ nullable: true }).isLength({ max: 500 }).withMessage("La descrizione può essere lunga al massimo 500 caratteri"),
    body("rooms").isInt({ min: 1 }).withMessage("Le stanze devono essere almeno 1"),
    body("bedrooms").isInt({ min: 1 }).withMessage("Le camere da letto devono essere almeno 1"),
    body("bathrooms").isInt({ min: 1 }).withMessage("I bagni devono essere almeno 1"),
    body("square_meters").isInt({ min: 10 }).withMessage("I metri quadri devono essere almeno 10"),
    body("address").isString().isLength({ min: 5, max: 255 }).withMessage("L'indirizzo deve avere tra 5 e 255 caratteri"),


    validateInputs,

    (req, res, next) => {
        const a = req.body;

        const maiusc = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        a.city = maiusc(a.city);


        console.log("Dati ricevuti e validati:", a);

        const sql = `
        INSERT INTO house (id_property, title, city, descr, rooms, url_img, bedrooms, bathrooms, square_meters, address, email, likes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        dbConnection.query(sql, [
            a.id_property, a.title, a.city, a.descr, a.rooms, a.url_img,
            a.bedrooms, a.bathrooms, a.square_meters, a.address, a.email, likes = 0

        ], (err, results) => {
            if (err) {
                console.error("Errore SQL:", err.message);
                return next(err); // Passiamo l'errore al middleware `errorHandler`
            }

            return res.status(201).json({
                status: "success",
                insertedId: results.insertId
            });
        });
    }
];


const addLike = (req, res, next) => {
    const { id } = req.params;
    const { email } = req.body;

    const sqlEmail = `
    SELECT email
    FROM ${process.env.DB_DATABASE}.house 
    WHERE id = ?`

    const sql = `
    UPDATE ${process.env.DB_DATABASE}.house
    SET likes = likes + 1
    where id = ?`

    dbConnection.query(sqlEmail, [id], (err, results) => {
        if (err) {
            return next(new Error("Errore interno del server"))
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Immobile non trovato" });
        }

        const onwerEmail = results[0].email;

        console.log("Email ricevuta:", email)
        console.log("Email proprietario:", onwerEmail)

        if (email === onwerEmail) {
            return res.status(403).json({
                message: "Non puoi mettere like alla tua casa"
            })
        }

        // Se l'utente non è il proprietario, incrementa i like

        dbConnection.query(sql, [id], (err, results) => {
            if (err) {
                return next(new Error("Errore interno del server"));
            }

            return res.status(200).json({
                status: "success",
                message: "Like aggiunto con successo"
            })
        })

    });
}

const postReview = [
    // Validazione degli input con express-validator
    body("reviewContent").isString().trim().isLength({ min: 5, max: 500 }).withMessage("La recensione deve avere tra 5 e 500 caratteri"),
    body("username").isString().trim().isLength({ min: 3, max: 50 }).withMessage("Il nome utente deve avere tra 3 e 50 caratteri"),
    body("lengthOfDay").isInt({ min: 1 }).withMessage("Il numero di giorni deve essere almeno 1"),

    (req, res, next) => {
        //Controlliamo se ci sono errori di validazione
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "fail",
                message: "Errore di validazione",
                errors: errors.array()
            });
        }

        const houseId = (req.params.id);
        const { reviewContent, username, lengthOfDay, user_email } = req.body;

        //Verifica se l'ID della casa è un numero valido
        if (isNaN(houseId) || houseId <= 0) {
            return res.status(400).json({
                status: "fail",
                message: "ID della casa non valido"
            });
        }

        //Controlliamo se l'immobile esiste
        const houseSql = `SELECT * FROM house WHERE id = ?`;
        dbConnection.query(houseSql, [houseId], (err, result) => {
            if (err) {
                console.error("Errore SQL nella ricerca dell'immobile:", err.message);
                return next(new Error("Errore durante il controllo dell'immobile"));
            }


            if (result.length === 0) {
                return res.status(404).json({
                    status: "fail",
                    message: "Immobile non trovato"
                });
            }

            // Otteniamo la data attuale in formato YYYY-MM-DD
            const currentDate = new Date().toISOString().split('T')[0];

            //Se l'immobile esiste, inseriamo la recensione con la data
            const sql = `INSERT INTO review (id_house, review_content, username, length_of_stay, user_email, date) 
                        VALUES (?, ?, ?, ?, ?, ?)`;
            dbConnection.query(sql, [houseId, reviewContent, username, lengthOfDay, user_email, currentDate], (err, result) => {
                if (err) {
                    console.error("Errore SQL durante l'inserimento della recensione:", err.message);
                    return next(new Error("Errore nell'inserimento della recensione"));
                }

                res.status(201).json({
                    status: "success",
                    message: "Recensione aggiunta con successo"
                });
            });
        });
    }
];



module.exports = {
    index,
    show,
    store,
    addLike,
    postAppartemento,
    postReview,
    indexProperty,
    searchByCity,
    searchByCityValidation
}