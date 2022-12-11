// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarCasos();
  $('#casos').DataTable();
  actualizarEmailDelCaso();


});
let caso_check;
function re_abierto(){

    if(caso_check=="Re-Abierto"||caso_check=="Cerrado"){
        document.getElementById('txtInvestigador').style.display = "none";
        document.getElementById('txtRelacionado').style.display = "none";
        document.getElementById('txtBrecha').style.display = "none";
        document.getElementById('txtProyecto').style.display = "none";
        document.getElementById('txtEmpresa').style.display = "none";
        document.getElementById('txtTipo').style.display = "none";
        document.getElementById('txtIrregularidad').style.display = "none";
        document.getElementById('txtObjetivo').style.display = "none";
        document.getElementById('txtIncidencia').style.display = "none";
        document.getElementById('txtDias').style.display = "none";
        document.getElementById('txtOperandi').style.display = "none";
        document.getElementById('txtArea').style.display = "none";
        document.getElementById('txtDeteccion').style.display = "none";
        document.getElementById('txtDiagnostico').style.display = "none";
        document.getElementById('txtAcciones').style.display = "none";
        document.getElementById('txtConclusiones').style.display = "none";
        document.getElementById('txtObservaciones').style.display = "none";
        document.getElementById('txtBoton').style.display = "none";

    }
}
function cerrado(){

    if(caso_check=="Cerrado"){
        document.getElementById('txtSoporte').style.display = "none";
        modificarCaso();
    }
}
function admin(){

    if(localStorage.admin=="false"){
        document.getElementById('txtInvestigador').style.display = "none";
    }
}
function actualizarEmailDelCaso() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}

}

let investigador_check;
var  id2;
async function cargarCasos() {
  const request1 = await fetch('api/casos', {
    method: 'GET',
    headers: getHeaders()
  });
  const casos = await request1.json();
 console.log(casos);

/*
   const request2 = await fetch('api/modify', {
     method: 'GET',
     headers: getHeaders()
   });
   const modificado = await request2.json();
  console.log(modificado);
*/


  let listadoHtml = '';
  let ESTADO;
  for (let caso of casos) {
        if(caso.estado=="0"){ ESTADO = "Abierto";}
        if(caso.estado=="1"){ ESTADO = "Asignado";}
        if(caso.estado=="2"){ ESTADO = "Seguimiento";}
        if(caso.estado=="3"){ ESTADO = "Cerrado";}
        if(caso.estado=="4"){ ESTADO = "Re-Abierto";}
    //if(caso.id== modificado[0].id){
    //id2= caso.id;
   if(caso.id== localStorage.modificar){
    id2= localStorage.modificar;

    investigador_check= caso.investigador;
    caso_check= ESTADO;


        let botonModificar = '<a href="#" onclick="modificarCaso()" class="btn btn-success btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>';
        let casoHtml = '<tr><td>'+caso.id +'</td><td>'+caso.investigador+ '</td><td>' + ESTADO + '</td><td>'+ caso.id_caso_relacionado +'</td><td>'+ caso.id_brecha + '</td><td>'+ caso.id_proyecto + '</td><td>'+ caso.empresa + '</td><td>'+ caso.tipo + '</td><td>'+ caso.id_irregularidad + '</td><td>'+ caso.objetivo + '</td><td>'+ caso.incidencia + '</td><td>'+ caso.dias + '</td><td>'+ caso.operandi + '</td><td>'+ caso.area + '</td><td>'+ caso.deteccion + '</td><td>'+ caso.diagnostico + '</td><td>'+ caso.acciones + '</td><td>'+ caso.conclusiones + '</td><td>'+ caso.observaciones + '</td><td>'+ caso.soporte + '</td></tr>';
        listadoHtml += casoHtml;
    }

  }
        admin();
        re_abierto();
        cerrado();
document.querySelector('#casos tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}




async function modificarCaso() {
let datos = {};

    if(caso_check=="Cerrado"){
    }else{
            if (!confirm('¿Desea finalizar con las modificaciones de este caso?')) {
                return;
              }

            datos.investigador = document.getElementById('txtInvestigador').value;
            if(localStorage.admin=="false"){

                  datos.estado = 2;
              }
              else{

                if(datos.investigador == ""&& investigador_check == null ) { alert("por favor ingrese un Investigador valido");return}
                else {
                        if(investigador_check != null ) {}
                        if(datos.investigador != "") {datos.estado = 1;}

                }
              }
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


if(datos.investigador == "") { datos.investigador = null;}
if(datos.estado == "") { datos.estado = null;}
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



//ingresamos el cambio
 let request = await fetch('api/caso_modified/' + id2, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });


//quitamos de la tabla modify el caso
/*
   request = await fetch('api/modify/' + id2, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(datos)
    });
*/
     alert("El caso fue modificado con exito!");
  location.href = "casos.html";
}