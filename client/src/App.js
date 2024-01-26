import './App.css';
import { useState,useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import config from './config.js';


import Swal from 'sweetalert2';




function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();

  const [editar,setEditar] = useState(false);

  const [db_grupo_05_alpha_TeamList, setdb_grupo_05_alpha_Team] = useState([]);
  useEffect(() => {
    getdb_grupo_05_alpha_Team();
  }, []);

  const add = () => {
    Axios.post(`${config.nombreserver}/create`, {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getdb_grupo_05_alpha_Team();
       

      
      limpiarCampos();
      Swal.fire({
          title:"<strong>Registro exitoso!</strong>",
          html: "(<i>El empleado <strong>"+nombre+"</strong> fue registrado con éxito!!!</i>)",
          icon: 'success',
          timer:3000

      })
    });
  }
const update = () => {
  Axios.put(`${config.nombreserver}/update`, {
    id: id,
    nombre: nombre,
    edad: edad,
    pais: pais,
    cargo: cargo,
    anios: anios,
  })
  .then((response) => {
    if (response.status === 200) {
    } else {
      alert(`Error al actualizar el empleado. Estado ${response.status}`);
    }
  })
  .catch((error) => {
    console.error("Error al realizar la solicitud PUT:", error);
    alert("Error al actualizar el empleado. Consulta la consola para obtener más detalles.");
  });
  limpiarCampos();
  Swal.fire({
    title:"<strong>Actualización exitosa!!</strong>",
    html: "(<i>El empleado <strong>"+nombre+"</strong> fue actualizado con éxito!!!</i>)",
    icon: 'success',
    timer:3000

})
};
const deleteOne = (val) => {
  Swal.fire({
    title: "Confirmar eliminar?",
    html: "(<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong>?</i>)",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminarlo!"
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`${config.nombreserver}/delete/${val.id}`).then(() => {
        getdb_grupo_05_alpha_Team();
        limpiarCampos(); 
        Swal.fire({
          title: "Eliminado!",
          text: val.nombre+ "fue eliminado",
          icon: "success",
          showConfirmButton: false,
          timer:3000
        });
    });
      
    }
  });
  

}


const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);

}


const editardb_grupo_05_alpha_Team = (val) => {
  setEditar(true);
  setNombre(val.nombre);
  setEdad(val.edad);
  setPais(val.pais);
  setCargo(val.cargo);
  setAnios(val.anios);
  setId(val.id);

  console.log("Estado después de editardb_grupo_05_alpha_Team:", nombre, edad, pais, cargo, anios, id);
};



  const getdb_grupo_05_alpha_Team = () => {
    Axios.get(`${config.nombreserver}/db_grupo_05_alpha_Team`).then((response) => {
      setdb_grupo_05_alpha_Team(response.data);
    });
  }
 

  return (
    <div className="container">
    
        
        <div className="card text-center">
          <div className="card-header">
            GESTIÓN DE EMPLEADOS
          </div>
                <div className="card-body">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Nombre:</span>
                    <input type="text" 
                    onChange={(event) => {
                      setNombre(event.target.value);
                    }}
                    className="form-control" value={nombre} placeholder="Ingrese nombre" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Edad:</span>
                    <input type="number" value={edad}
                    onChange={(event) => {
                      setEdad(event.target.value);
                    }}
                    className="form-control" placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">País:</span>
                    <input type="text" value={pais}
                     onChange={(event) => {
                      setPais(event.target.value);
                    }}
                    className="form-control" placeholder="Ingrese un país" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>

                  
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Cargo:</span>
                    
                    <input type="text" value={cargo}
                     onChange={(event) => {
                      setCargo(event.target.value);
                    }}
                    className="form-control" placeholder="Ingrese un cargo" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
                    
                    <input type="number" value={anios}
                     onChange={(event) => {
                      setAnios(event.target.value);
                    }}
                    className="form-control" placeholder="Ingrese los años" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>


          </div>
          <div className="card-footer text-muted">
          {
            editar?
            <div>
            <button className ='btn btn-warning m-2' onClick={update}>Actualizar</button> 
            <button className ='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className ='btn btn-success' onClick={add}>Registrar</button>
            
          }

          
        </div>


        <table className="table table-striped">

                <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">País</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>

        {
          
          // db_grupo_05_alpha_TeamList.map((val, key) => {
          //   return <div key={key} className=''>{val.nombre}</div>
          // })
          db_grupo_05_alpha_TeamList.map((val, key) => {
            return (<tr key={val.id}>
                  <th>{val.id }</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" 
                  onClick={()=>{
                    editardb_grupo_05_alpha_Team(val);

                  }}
                  
                  
                  className="btn btn-info">Editar</button>
                  <button type="button" onClick={()=>{
                      deleteOne(val);

                  }}
                  className="btn btn-danger">Eliminar</button>
                 
                </div>



                  </td>

                  


                </tr>)
            
              })
        }



            
          </tbody>
          </table>
    </div>
    </div>
  );
}

export default App;
