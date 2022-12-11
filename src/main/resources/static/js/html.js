// Call the dataTables jQuery plugin
$(document).ready(function() {

  actualizarEmailDelUsuario();
  admin();
});

function actualizarEmailDelUsuario() {

   if(localStorage.admin=="true"){ ;document.getElementById('txt-email-usuario').outerHTML = "Administrador: "+localStorage.email;}else{ document.getElementById('txt-email-usuario').outerHTML = "Investigador: "+localStorage.email;}
}

function admin(){

    if(localStorage.admin=="false"){
    document.getElementById('hidden').style.display = "none";
    document.getElementById('hidden1').style.display = "none";
    document.getElementById('hidden2').style.display = "none";
    document.getElementById('hidden3').style.display = "none";
    document.getElementById('hidden4').style.display = "none";
    document.getElementById('hidden5').style.display = "none";
    document.getElementById('hidden6').style.display = "none";
    document.getElementById('hidden7').style.display = "none";
    document.getElementById('hidden8').style.display = "none";
    document.getElementById('hidden9').style.display = "none";
    }

}