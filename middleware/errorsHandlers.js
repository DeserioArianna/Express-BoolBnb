const errorHandlers = (err, req, res, next) => {
    const resObj = {
     status: "fail",
     message: err.message,
    };
 

    if("development"){
        resObj.detail = err.stack
    }

    return res.status(500).json(resObj);
 };
 
 module.exports = errorHandlers