$(document).ready(function() {
   // on ready
});


async function registrarEquipos_robados() {
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


  const request = await fetch('api/equipos_robados', {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("El equipo robado fue creada con exito!");
  window.location.href = 'equipos_robados.html'

}
