// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarBrechas();
  $('#brecha').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}


async function cargarBrechas() {
  const request = await fetch('api/brechas', {
    method: 'GET',
    headers: getHeaders()
  });
  const brechas = await request.json();


  let listadoHtml = '';
  let TIPO;
  for (let brecha of brechas) {

    let botonEliminar = '<a href="#" onclick="eliminarBrecha(' + brecha.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let botonModificar = '<a href="#" onclick="modificarBrecha(' + brecha.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

    let brechaHtml = '<tr><td>' + botonEliminar + '</td><td>' + botonModificar + '</td><td>'+brecha.id+'</td><td>' + brecha.tipo+'</td><td>' + brecha.subtipo+'</td></tr>';
    listadoHtml += brechaHtml;
  }

document.querySelector('#brecha tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarBrecha(id) {

  if (!confirm('¿Desea eliminar esta brecha?')) {
    return;
  }

 const request = await fetch('api/brechas/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}

async function modificarBrecha(id) {

if (!confirm('¿Desea modificar esta brecha?')) {
    return;
  }
let datos = {};
datos.id = id;
localStorage.modificar = id;


  location.href = "modify_brecha.html";
}