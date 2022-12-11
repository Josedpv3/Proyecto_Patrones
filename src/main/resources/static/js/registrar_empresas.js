$(document).ready(function() {
   // on ready
});


async function registrarEmpresa() {
  let datos = {};
  datos.nombre = document.getElementById('txtNombre').value;





if(datos.nombre== "") {   alert('Falta el siguiente dato: Nombre.'); return; }
;


  const request = await fetch('api/empresas', {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("La cuenta fue creada con exito!");
  window.location.href = 'empresas.html'

}
