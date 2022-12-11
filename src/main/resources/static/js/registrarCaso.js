$(document).ready(function() {
   // on ready
    admin();
});

function admin(){

    if(localStorage.admin=="false"){
        document.getElementById('txtInvestigador').style.display = "none";
    }
}
async function registrarCaso() {
  let datos = {};
  if(localStorage.admin=="false"){
      datos.investigador = null;
      datos.estado = 0;
  }
  else{
    datos.estado = 1;
    datos.investigador = document.getElementById('txtInvestigador').value;
    if(datos.investigador == "") { alert("por favor ingrese un Investigador valido");return;}
  }






  datos.id_caso_relacionado = document.getElementById('txtRelacionado').value;
  datos.id_brecha = document.getElementById('txtBrecha').value;
  datos.id_proyecto = document.getElementById('txtProyecto').value;

    datos.empresa = document.getElementById('txtEmpresa').value;
     datos.tipo = document.getElementById('txtTipo').value;
        datos.id_irregularidad = document.getElementById('txtIrregularidad').value;
        datos.objetivo = document.getElementById('txtObjetivo').value;
        datos.incidencia = document.getElementById('txtIncidencia').value;

    datos.dias = document.getElementById('txtDias').value;
    datos.operandi = document.getElementById('txtOperandi').value;
    datos.area = document.getElementById('txtArea').value;
    datos.deteccion = document.getElementById('txtDeteccion').value;

      datos.diagnostico = document.getElementById('txtDiagnostico').value;
      datos.acciones = document.getElementById('txtAcciones').value;
      datos.conclusiones = document.getElementById('txtConclusiones').value;
      datos.observaciones = document.getElementById('txtObservaciones').value;
      datos.soporte = document.getElementById('txtSoporte').value;




if(datos.id_caso_relacionado == "") { datos.id_caso_relacionado = null;}
if(datos.id_brecha == "") { datos.id_brecha = null;}
if(datos.id_proyecto == "") { datos.id_proyecto = null;}

if(datos.empresa == "") { datos.empresa = null;}
if(datos.tipo == "") { datos.tipo = null;}
if(datos.id_irregularidad == "") { datos.id_irregularidad = null;}
if(datos.objetivo == "") { datos.objetivo = null;}
if(datos.incidencia == "") { datos.incidencia = null;}


if(datos.dias == "") { datos.dias = null;}
if(datos.operandi == "") { datos.operandi = null;}
if(datos.area == "") { datos.area = null;}
if(datos.deteccion == "") { datos.deteccion = null;}

if(datos.diagnostico == "") { datos.diagnostico = null;}
if(datos.acciones == "") { datos.acciones = null;}
if(datos.conclusiones == "") { datos.conclusiones = null;}
if(datos.observaciones == "") { datos.observaciones = null;}
if(datos.soporte == "") { datos.soporte = null;}


  const request = await fetch('api/casos', {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("El caso fue creado con exito!");
  window.location.href = 'casos.html'

}
