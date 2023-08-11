console.log("inicia");
const knex = require("knex")({
    client:"pg",
    connection: {
        host:"172.16.29.243",
        database:"MADHOS_DUANA_PRUEBAS",
        user : "intranet",
        password : "03vWA.d2URhyUxs2PKv"
    }  
});
console.log("termina");
module.exports = knex;