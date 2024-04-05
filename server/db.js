const Pool = require('pg').Pool

const pool = new Pool ({
    user: "postgress",
    password :"adimin",
    host: "localhost",
    port: 5432,
    database: "todolist"

})
module.exports = pool;