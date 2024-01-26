const express = require ("express");
const cors = require("cors");

const app = express();
const mysql = require("mysql");

app.use(cors());

app.use(express.json());


//para que el backend pueda recibir peticiones del cliente
const corsOptions = {
    origin: 'http://localhost:3000', // Reemplaza con el dominio de tu aplicación frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));

  const db = mysql.createConnection({
    host: "68.64.164.116",
    port: "19905",
    user: "app_102_g05_mdelgado",
    password: "app_102_g05_mdelgado",
    database: "db_grupo_05_alpha_Team",
    });
    


app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO db_grupo_05_alpha_Team (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)',
        [nombre, edad, pais, cargo, anios],
        (err, result) => {
            if (err) {
                console.log(err);
                
            } else {
                res.status(200).send(result);
            }
        }
    );
});

app.get("/db_grupo_05_alpha_Team", (req, res) => {
    db.query('SELECT *FROM db_grupo_05_alpha_Team' ,
        (err, result) => {
            if (err) {
                console.log(err);
                
            } else {
                res.send(result);
            }
        }
    );
});


app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
     
    console.log(id);
    console.log(nombre);
    console.log(edad);
    console.log(pais);
    console.log(cargo);
    console.log(anios);
   


    db.query('UPDATE `db_grupo_05_alpha_Team` SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
        (err, result) => {
            if (err) {
                console.log(err); 
            } else {
                res.status(200).send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    
    db.query('DELETE FROM `db_grupo_05_alpha_Team` WHERE id=?',[id],
        (err, result) => {
            if (err) {
                console.log(err); 
            } else {
                res.status(200).send(result);
            }
        }
    );
});



app.listen(19905,()=>{
    console.log("Corriendo en el puerto 19905")
})