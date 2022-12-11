$(document).ready(function() {
   // on ready
});


async function registrarIrregularidad() {
  let datos = {};
   datos.tipo = document.getElementById('txtTipo').value;
     datos.subtipo = document.getElementById('txtSubtipo').value;



if(datos.tipo == "") { datos.tipo = null;}
if(datos.subtipo == "") { datos.subtipo = null;}






  const request = await fetch('api/irregularidades', {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("La irregularidad fue creada con exito!");
  window.location.href = 'irregularidad.html'

}
