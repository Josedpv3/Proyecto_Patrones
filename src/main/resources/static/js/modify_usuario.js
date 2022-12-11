// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#usuarios').DataTable();
  actualizarEmailDelCaso();


});



function actualizarEmailDelCaso() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}

}


async function cargarUsuarios() {
  const request1 = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
  });
  const datos = await request1.json();




  let listadoHtml = '';
let TIPO;
  for (let dato of datos) {

       if(dato.id== localStorage.modificar){

        if(dato.tipo== "1"){TIPO="Admin";}
        if(dato.tipo== "0"){TIPO="Investigador";}
        let botonModificar = '<a href="#" onclick="modificarUsuario()" class="btn btn-success btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

        let usuarioHtml = '<tr><td>' + botonModificar + '</td><td>'+dato.id+'</td><td>' + dato.nombre + ' ' + dato.apellido + '</td><td>' + dato.email+'</td><td>'+TIPO+ '</td></tr>';
        listadoHtml += usuarioHtml;
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




async function modificarUsuario() {
let datos = {};



   datos.nombre = document.getElementById('txtNombre').value;
   datos.apellido = document.getElementById('txtApellido').value;
   datos.email = document.getElementById('txtEmail').value;
   datos.password = document.getElementById('txtPassword').value;
let repetirPassword = document.getElementById('txtRepetirPassword').value;

  if (repetirPassword != datos.password) {
    alert('La contraseña que escribiste es diferente.');
    return;
  }


if(datos.nombre == "") { datos.nombre = null;}
if(datos.apellido == "") { datos.apellido = null;}
if(datos.email == "") { datos.email = null;}
if(datos.password == "") { datos.password = null;}
if(datos.repetirPassword == "") { datos.repetirPassword = null;}



//ingresamos el cambio
 let request = await fetch('api/usuario_modified/' + localStorage.modificar, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });



     alert("El usuario fue modificado con exito!");
  location.href = "usuarios.html";
}