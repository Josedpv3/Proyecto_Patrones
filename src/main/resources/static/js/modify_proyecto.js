// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarProyectos();
  $('#proyecto').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}


async function cargarProyectos() {
  const request = await fetch('api/proyectos', {
    method: 'GET',
    headers: getHeaders()
  });
  const datos = await request.json();


  let listadoHtml = '';
let TIPO;
  for (let dato of datos) {

       if(dato.id== localStorage.modificar){

        let botonModificar = '<a href="#" onclick="modificarProyecto()" class="btn btn-success btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

        let proyectoHtml = '<tr><td>' + botonModificar + '</td><td>'+dato.id+'</td><td>' + dato.tipo+'</td><td>'+dato.subtipo+ '</td></tr>';
        listadoHtml += proyectoHtml;
        }

  }

document.querySelector('#datos tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}




async function modificarProyecto() {
let datos = {};




   datos.tipo = document.getElementById('txtTipo').value;
   datos.subtipo = document.getElementById('txtSubtipo').value;


if(datos.tipo == "") { datos.tipo = null;}
if(datos.subtipo == "") { datos.subtipo = null;}




//ingresamos el cambio
 let request = await fetch('api/proyecto_modified/' + localStorage.modificar, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });



     alert("El proyecto fue modificado con exito!");
  location.href = "proyecto.html";
}