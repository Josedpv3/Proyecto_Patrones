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
  const datos = await request.json();




  let listadoHtml = '';
let TIPO;
  for (let dato of datos) {


    if(dato.id== localStorage.modificar){


        let botonModificar = '<a href="#" onclick="modificarEmpresa()" class="btn btn-success btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';

        let empresaHtml = '<tr><td>' + botonModificar + '</td><td>'+dato.id+'</td><td>' + dato.nombre + '</td></tr>';
            listadoHtml += empresaHtml;
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




async function modificarEmpresa() {
let datos = {};



   datos.nombre = document.getElementById('txtNombre').value;




if(datos.nombre == "") { datos.nombre = null;}




//ingresamos el cambio
 let request = await fetch('api/empresa_modified/' + localStorage.modificar, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });



     alert("El nombre de la empresa fue modificado con exito!");
  location.href = "empresas.html";
}