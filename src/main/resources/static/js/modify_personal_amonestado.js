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
  const datos = await request.json();




  let listadoHtml = '';

  for (let dato of datos) {
alert(dato.id);
alert(localStorage.modificar);
       if(dato.id== localStorage.modificar){


        let botonModificar = '<a href="#" onclick="modificarPersonal_amonestado()" class="btn btn-success btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

        let personal_amonestadoHtml = '<tr><td>' + botonModificar + '</td><td>'+dato.ci+'</td><td>' + dato.nombre + ' ' + dato.apellido + '</td><td>' + dato.empresa+'</td><td>'+dato.caso+ '</td></tr>';
        listadoHtml += personal_amonestadoHtml;
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




async function modificarPersonal_amonestado() {
let datos = {};


    datos.ci = document.getElementById('txtCI').value;
   datos.nombre = document.getElementById('txtNombre').value;
   datos.apellido = document.getElementById('txtApellido').value;
   datos.empresa = document.getElementById('txtEmail').value;
   datos.caso = document.getElementById('txtCaso').value;


if(datos.ci == "") { datos.ci = null;}
if(datos.nombre == "") { datos.nombre = null;}
if(datos.apellido == "") { datos.apellido = null;}
if(datos.empresa == "") { datos.empresa = null;}
if(datos.caso == "") { datos.caso = null;}



//ingresamos el cambio
 let request = await fetch('api/personal_amonestado_modified/' + localStorage.modificar, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });



     alert("El personal amonestado fue modificado con exito!");
  location.href = "personal_amonestado.html";
}