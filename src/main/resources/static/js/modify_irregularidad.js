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
  const datos = await request.json();




  let listadoHtml = '';

  for (let dato of datos) {

       if(dato.id== localStorage.modificar){


        let botonModificar = '<a href="#" onclick="modificarIrregularidad()" class="btn btn-success btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';


    let irregularidadHtml = '<tr><td>' + botonModificar + '</td><td>'+dato.id+'</td><td>' + dato.tipo + '</td><td>' + dato.subtipo+'</td></tr>';
    listadoHtml += irregularidadHtml;
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




async function modificarIrregularidad() {
let datos = {};



   datos.tipo = document.getElementById('txtTipo').value;
   datos.subtipo = document.getElementById('txtSubtipo').value;




if(datos.tipo == "") { datos.tipo = null;}
if(datos.subtipo == "") { datos.subtipo = null;}




//ingresamos el cambio
 let request = await fetch('api/irregularidad_modified/' + localStorage.modificar, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });



     alert("La irregularidad fue modificada con exito!");
  location.href = "irregularidad.html";
}