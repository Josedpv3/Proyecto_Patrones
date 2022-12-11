$(document).ready(function() {
   // on ready
});


async function registrarPersonal_amonestado() {
  let datos = {};

     datos.ci = document.getElementById('txtCI').value;
    datos.nombre = document.getElementById('txtNombre').value;
    datos.apellido = document.getElementById('txtApellido').value;
    datos.empresa = document.getElementById('txtEmpresa').value;
    datos.caso = document.getElementById('txtCaso').value;




if(datos.nombre== "") {   alert('Falta el siguiente dato: Nombre.'); return; }
if(datos.apellido== "") {   alert('Falta el siguiente dato: Apellido.'); return; }
if(datos.ci== "") {   alert('Falta el siguiente dato: CI.'); return; }
if(datos.empresa== "") {   alert('Falta el siguiente dato: Empresa.'); return; }
if(datos.caso== "") {   alert('Falta el siguiente dato: Caso.'); return; }



  const request = await fetch('api/personal_amonestados', {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("El personal amonestado fue creado con exito!");
  window.location.href = 'personal_amonestado.html'

}
