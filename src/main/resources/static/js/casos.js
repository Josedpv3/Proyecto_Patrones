// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarCasos();
  $('#casos').DataTable();
actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}


async function cargarCasos() {
  const request = await fetch('api/casos', {
    method: 'GET',
    headers: getHeaders()
  });
  const casos = await request.json();
 console.log(casos);

  let listadoHtml = '';
  let ESTADO;
  for (let caso of casos) {

        if(caso.estado=="0"){ ESTADO = "Abierto";}
        if(caso.estado=="1"){ ESTADO = "Asignado";}
        if(caso.estado=="2"){ ESTADO = "Seguimiento";}
        if(caso.estado=="3"){ ESTADO = "Cerrado";}
        if(caso.estado=="4"){ ESTADO = "Re-Abierto";}
    if(localStorage.admin=="true"){
            let botonEliminar = '<a href="#" onclick="eliminarCaso(' + caso.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            let botonModificar = '<a href="#" onclick="modificarCaso(' + caso.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

            let casoHtml = '<tr><td>' + botonModificar + '</td><td>'+caso.id+'</td><td>'+caso.investigador+'</td><td>' + ESTADO + '</td><td>'+ caso.id_caso_relacionado +'</td><td>'+ caso.id_brecha + '</td><td>'+ caso.id_proyecto + '</td><td>'+ caso.empresa + '</td><td>'+ caso.tipo + '</td><td>'+ caso.id_irregularidad + '</td><td>'+ caso.objetivo + '</td><td>'+ caso.incidencia + '</td><td>'+ caso.dias + '</td><td>'+ caso.operandi + '</td><td>'+ caso.area + '</td><td>'+ caso.deteccion + '</td><td>'+ caso.diagnostico + '</td><td>'+ caso.acciones + '</td><td>'+ caso.conclusiones + '</td><td>'+ caso.observaciones + '</td><td>'+ caso.soporte + '</td></tr>';
            listadoHtml += casoHtml;
    }else{
        if(caso.investigador==localStorage.id){
            let botonEliminar = '<a href="#" onclick="eliminarCaso(' + caso.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            let botonModificar = '<a href="#" onclick="modificarCaso(' + caso.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

            let casoHtml = '<tr><td>' + botonModificar + '</td><td>'+caso.id+'</td><td>'+caso.investigador+'</td><td>' + ESTADO + '</td><td>'+ caso.id_caso_relacionado +'</td><td>'+ caso.id_brecha + '</td><td>'+ caso.id_proyecto + '</td><td>'+ caso.empresa + '</td><td>'+ caso.tipo + '</td><td>'+ caso.id_irregularidad + '</td><td>'+ caso.objetivo + '</td><td>'+ caso.incidencia + '</td><td>'+ caso.dias + '</td><td>'+ caso.operandi + '</td><td>'+ caso.area + '</td><td>'+ caso.deteccion + '</td><td>'+ caso.diagnostico + '</td><td>'+ caso.acciones + '</td><td>'+ caso.conclusiones + '</td><td>'+ caso.observaciones + '</td><td>'+ caso.soporte + '</td></tr>';
            listadoHtml += casoHtml;
        }
    }
  }

document.querySelector('#casos tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarCaso(id) {

  if (!confirm('¿Desea eliminar este caso?')) {
    return;
  }

 const request = await fetch('api/casos/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}


async function modificarCaso(id) {

if (!confirm('¿Desea modificar este caso?')) {
    return;
  }
let datos = {};
datos.id = id;
localStorage.modificar = id;
/*
 const request = await fetch('api/caso_modify/' + id, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });*/

  location.href = "modify.html";
}