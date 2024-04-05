const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
//middleware
app.use(cors())
app.use(express.json())


//Rotas

//Inserir
app.post("/todos", async (req, res) => {
    try {
        const {descripition} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (descripition) Values($1) RETURNING *",
        [descripition])

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error)
    }
})

//Listar
app.get("/todos/:id", async (req,res) =>{
    try {
        const {id}= req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])

        res.json(todo.rows[0])
    }catch (error){
        console.log (error)
    }
})

//Listar Todos os itens
app.get("/todos", async (req,res) =>{
    try {
        const {id}= req.params;
        const todo = await pool.query("SELECT * FROM todo")

        res.json(todo.rows)
    }catch (error){
        console.log (error)
    }
})


//Atulizar um item da nossa lista
app.put('/todos/:id', async (req,res) =>{
    try{
        const{id} = req.params
        const{ descripition } = req.body
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $",
            [description, id]
        )

        res.json("Item atualizado")
    } catch (error){
        console.log(error)
    }
})

//deletar um item da nossa lista
app.delete ('/todos/:id', async (req,res) =>{
    try {
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
        [id]
        )

        res.json("Item deletado")
    } catch (error) {
        console.log(error)
    }

})


app.listen(5000, () => {
    console.log('O servidor iniciou na porta 5000')
});