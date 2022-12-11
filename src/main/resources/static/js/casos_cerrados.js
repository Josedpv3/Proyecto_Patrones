// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarCasos();
  $('#casos').DataTable();
actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}


async function cargarCasos() {
  const request = await fetch('api/casos', {
    method: 'GET',
    headers: getHeaders()
  });
  const casos = await request.json();
 console.log(casos);

  let listadoHtml = '';
  let ESTADO;
  for (let caso of casos) {


            if(caso.estado=="3"){ ESTADO = "Cerrado";}

     if(caso.estado=="3" )
     {
        if(localStorage.admin=="true"){
                let botonreabrir = '<a href="#" onclick="re_abrir(' + caso.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

                let casoHtml = '<tr><td>' + botonreabrir + '</td><td>'+caso.id+'</td><td>'+caso.investigador+'</td><td>' + ESTADO + '</td><td>'+ caso.id_caso_relacionado +'</td><td>'+ caso.id_brecha + '</td><td>'+ caso.id_proyecto + '</td><td>'+ caso.empresa + '</td><td>'+ caso.tipo + '</td><td>'+ caso.id_irregularidad + '</td><td>'+ caso.objetivo + '</td><td>'+ caso.incidencia + '</td><td>'+ caso.dias + '</td><td>'+ caso.operandi + '</td><td>'+ caso.area + '</td><td>'+ caso.deteccion + '</td><td>'+ caso.diagnostico + '</td><td>'+ caso.acciones + '</td><td>'+ caso.conclusiones + '</td><td>'+ caso.observaciones + '</td><td>'+ caso.soporte + '</td></tr>';
                listadoHtml += casoHtml;
        }else{
            if(caso.investigador==localStorage.id){
                let botonreabrir = '<a href="#" onclick="re_abrir(' + caso.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

                let casoHtml = '<tr><td>' + botonreabrir + '</td><td>'+caso.id+'</td><td>'+caso.investigador+'</td><td>' + ESTADO + '</td><td>'+ caso.id_caso_relacionado +'</td><td>'+ caso.id_brecha + '</td><td>'+ caso.id_proyecto + '</td><td>'+ caso.empresa + '</td><td>'+ caso.tipo + '</td><td>'+ caso.id_irregularidad + '</td><td>'+ caso.objetivo + '</td><td>'+ caso.incidencia + '</td><td>'+ caso.dias + '</td><td>'+ caso.operandi + '</td><td>'+ caso.area + '</td><td>'+ caso.deteccion + '</td><td>'+ caso.diagnostico + '</td><td>'+ caso.acciones + '</td><td>'+ caso.conclusiones + '</td><td>'+ caso.observaciones + '</td><td>'+ caso.soporte + '</td></tr>';
                listadoHtml += casoHtml;
            }
        }
     }
  }

document.querySelector('#casos tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}


async function re_abrir(id) {

  if (!confirm('¿Desea re-abrir este caso?')) {
    return;
  }

  let request = await fetch('api/re_abrir_caso/' + id, {
     method: 'GET',
     headers: getHeaders()
   });

  location.reload()
}

