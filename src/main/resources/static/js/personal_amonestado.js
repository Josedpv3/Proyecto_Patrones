// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarPersonal_amonestados();
  $('#personal_amonestado').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}


async function cargarPersonal_amonestados() {
  const request = await fetch('api/personal_amonestados', {
    method: 'GET',
    headers: getHeaders()
  });
  const personal_amonestados = await request.json();


  let listadoHtml = '';
  let TIPO;
  for (let personal_amonestado of personal_amonestados) {

    let botonEliminar = '<a href="#" onclick="eliminarPersonal_amonestado(' + personal_amonestado.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let botonModificar = '<a href="#" onclick="modificarPersonal_amonestado(' + personal_amonestado.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

    let personal_amonestadoHtml = '<tr><td>' + botonEliminar + '</td><td>' + botonModificar + '</td><td>'+personal_amonestado.ci+'</td><td>' + personal_amonestado.nombre + ' ' + personal_amonestado.apellido + '</td><td>' + personal_amonestado.empresa+'</td><td>'+personal_amonestado.caso+ '</td></tr>';
    listadoHtml += personal_amonestadoHtml;
  }

document.querySelector('#personal_amonestado tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarPersonal_amonestado(id) {

  if (!confirm('¿Desea eliminar este personal amonestado?')) {
    return;
  }

 const request = await fetch('api/personal_amonestados/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}

async function modificarPersonal_amonestado(id) {

if (!confirm('¿Desea modificar este personal amonestado?')) {
    return;
  }
let datos = {};
datos.id = id;
localStorage.modificar = id;


  location.href = "modify_personal_amonestado.html";
}