// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarIrregularidades();
  $('#irregularidad').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}


async function cargarIrregularidades() {
  const request = await fetch('api/irregularidades', {
    method: 'GET',
    headers: getHeaders()
  });
  const irregularidades = await request.json();


  let listadoHtml = '';

  for (let irregularidad of irregularidades) {

    let botonEliminar = '<a href="#" onclick="eliminarIrregularidad(' + irregularidad.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let botonModificar = '<a href="#" onclick="modificarIrregularidad(' + irregularidad.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

    let irregularidadHtml = '<tr><td>' + botonEliminar + '</td><td>' + botonModificar + '</td><td>'+irregularidad.id+'</td><td>' + irregularidad.tipo + '</td><td>' + irregularidad.subtipo+'</td></tr>';
    listadoHtml += irregularidadHtml;
  }

document.querySelector('#irregularidad tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarIrregularidad(id) {

  if (!confirm('¿Desea eliminar esta irregularidad?')) {
    return;
  }

 const request = await fetch('api/irregularidades/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}

async function modificarIrregularidad(id) {

if (!confirm('¿Desea modificar esta irregularidad?')) {
    return;
  }
let datos = {};
datos.id = id;
localStorage.modificar = id;


  location.href = "modify_irregularidad.html";
}