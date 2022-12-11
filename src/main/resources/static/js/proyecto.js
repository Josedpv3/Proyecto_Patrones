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
  const proyectos = await request.json();


  let listadoHtml = '';

  for (let proyecto of proyectos) {

    let botonEliminar = '<a href="#" onclick="eliminarProyecto(' + proyecto.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let botonModificar = '<a href="#" onclick="modificarProyecto(' + proyecto.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

    let proyectoHtml = '<tr><td>' + botonEliminar + '</td><td>' + botonModificar + '</td><td>'+proyecto.id+'</td><td>' + proyecto.tipo +  '</td><td>' + proyecto.subtipo+'</td></tr>';
    listadoHtml += proyectoHtml;
  }

document.querySelector('#proyecto tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarProyecto(id) {

  if (!confirm('¿Desea eliminar este proyecto?')) {
    return;
  }

 const request = await fetch('api/proyectos/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}

async function modificarProyecto(id) {

if (!confirm('¿Desea modificar este proyecto?')) {
    return;
  }
let datos = {};
datos.id = id;
localStorage.modificar = id;


  location.href = "modify_proyecto.html";
}