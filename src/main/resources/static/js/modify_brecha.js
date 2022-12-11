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
  const datos = await request.json();




  let listadoHtml = '';

  for (let dato of datos) {

      if(dato.id== localStorage.modificar){

                    let botonModificar = '<a href="#" onclick="modificarBrecha()" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

           let brechaHtml = '<tr><td>' + botonModificar + '</td><td>'+dato.id+'</td><td>' + dato.tipo+'</td><td>' + dato.subtipo+'</td></tr>';
           listadoHtml += brechaHtml;

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




async function modificarBrecha() {
let datos = {};



   datos.tipo = document.getElementById('txtTipo').value;
   datos.subtipo = document.getElementById('txtSubtipo').value;





if(datos.tipo == "") { datos.tipo = null;}
if(datos.subtipo == "") { datos.subtipo = null;}





//ingresamos el cambio
 let request = await fetch('api/brecha_modified/' + localStorage.modificar, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });



     alert("La brecha fue modificado con exito!");
  location.href = "brecha.html";
}