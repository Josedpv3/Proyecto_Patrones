// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarEquipos_robados();
  $('#equipos_robados').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}


async function cargarEquipos_robados() {
  const request = await fetch('api/equipos_robados', {
    method: 'GET',
    headers: getHeaders()
  });
  const equipos_robados = await request.json();


  let listadoHtml = '';
  for (let equipo_robado of equipos_robados) {

    let botonEliminar = '<a href="#" onclick="eliminarEquipos_robados(' + equipo_robado.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let botonModificar = '<a href="#" onclick="modificarEquipos_robados(' + equipo_robado.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

    let equipo_robadoHtml = '<tr><td>' + botonEliminar + '</td><td>' + botonModificar + '</td><td>'+equipo_robado.serial+'</td><td>' + equipo_robado.empresa + '</td><td>' + equipo_robado.marca+'</td><td>' + equipo_robado.modelo+'</td><td>' + equipo_robado.tipo+'</td><td>' + equipo_robado.observaciones+'</td></tr>';
    listadoHtml += equipo_robadoHtml;
  }

document.querySelector('#equipos_robados tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarEquipos_robados(id) {

  if (!confirm('¿Desea eliminar este equipo robado?')) {
    return;
  }

 const request = await fetch('api/equipos_robados/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}

async function modificarEquipos_robados(id) {

if (!confirm('¿Desea modificar este equipo robado?')) {
    return;
  }
let datos = {};
datos.id = id;
localStorage.modificar = id;


  location.href = "modify_equipos_robados.html";
}