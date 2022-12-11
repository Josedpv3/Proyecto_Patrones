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
  const datos = await request.json();




  let listadoHtml = '';
let TIPO;
  for (let dato of datos) {

       if(dato.id== localStorage.modificar){


            let botonModificar = '<a href="#" onclick="modificarEquipos_robados()" class="btn btn-success btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

            let equipo_robadoHtml = '<tr><td>' + botonModificar + '</td><td>'+dato.serial+'</td><td>' + dato.empresa + '</td><td>' + dato.marca+'</td><td>' + dato.modelo+'</td><td>' + dato.tipo+'</td><td>' + dato.observaciones+'</td></tr>';
               listadoHtml += equipo_robadoHtml;


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




async function modificarEquipos_robados() {
let datos = {};


    datos.serial = document.getElementById('txtSerial').value;
   datos.empresa = document.getElementById('txtEmpresa').value;
   datos.marca = document.getElementById('txtMarca').value;
   datos.modelo = document.getElementById('txtModelo').value;
   datos.tipo = document.getElementById('txtTipo').value;
    datos.observaciones = document.getElementById('txtObservaciones').value;

if(datos.serial == "") { datos.serial = null;}
if(datos.empresa == "") { datos.empresa = null;}
if(datos.marca == "") { datos.marca = null;}
if(datos.modelo == "") { datos.modelo = null;}
if(datos.tipo == "") { datos.tipo = null;}
if(datos.observaciones == "") { datos.observaciones = null;}



//ingresamos el cambio
 let request = await fetch('api/equipos_robados_modified/' + localStorage.modificar, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });



     alert("El usuario fue modificado con exito!");
  location.href = "equipos_robados.html";
}