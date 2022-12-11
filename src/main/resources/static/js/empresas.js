// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarEmpresas();
  $('#empresas').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}


async function cargarEmpresas() {
  const request = await fetch('api/empresas', {
    method: 'GET',
    headers: getHeaders()
  });
  const empresas = await request.json();


  let listadoHtml = '';

  for (let empresa of empresas) {

    let botonEliminar = '<a href="#" onclick="eliminarEmpresa(' + empresa.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let botonModificar = '<a href="#" onclick="modificarEmpresa(' + empresa.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

    let empresaHtml = '<tr><td>' + botonEliminar + '</td><td>' + botonModificar + '</td><td>'+empresa.id+'</td><td>' + empresa.nombre + '</td></tr>';
    listadoHtml += empresaHtml;
  }

document.querySelector('#empresas tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarEmpresa(id) {

  if (!confirm('¿Desea eliminar esta empresa?')) {
    return;
  }

 const request = await fetch('api/empresas/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}

async function modificarEmpresa(id) {

if (!confirm('¿Desea modificar esta empresa?')) {
    return;
  }
let datos = {};
datos.id = id;
localStorage.modificar = id;


  location.href = "modify_empresas.html";
}