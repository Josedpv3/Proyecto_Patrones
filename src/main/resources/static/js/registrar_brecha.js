$(document).ready(function() {
   // on ready
});


async function registrarBrecha() {
  let datos = {};
datos.tipo = document.getElementById('txtTipo').value;
   datos.subtipo = document.getElementById('txtSubtipo').value;




if(datos.tipo== "") {   alert('Falta el siguiente dato: Tipo.'); return; }
if(datos.subtipo== "") {   alert('Falta el siguiente dato: Subtipo.'); return; }




  const request = await fetch('api/brechas', {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("La brecha fue creada con exito!");
  window.location.href = 'brecha.html'

}
