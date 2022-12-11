$(document).ready(function() {
   // on ready
});


async function registrarUsuario() {
  let datos = {};
  datos.nombre = document.getElementById('txtNombre').value;
  datos.apellido = document.getElementById('txtApellido').value;
  datos.email = document.getElementById('txtEmail').value;
  datos.password = document.getElementById('txtPassword').value;


  let repetirPassword = document.getElementById('txtRepetirPassword').value;

  if (repetirPassword != datos.password) {
    alert('La contraseña que escribiste es diferente.');
    return;
  }

if(datos.nombre== "") {   alert('Falta el siguiente dato: Nombre.'); return; }
if(datos.apellido== "") {   alert('Falta el siguiente dato: Apellido.'); return; }
if(datos.email== "") {   alert('Falta el siguiente dato: Email.'); return; }
if(datos.password== "") {   alert('Falta el siguiente dato: Contraseña.'); return; }
if(datos.repetirPassword== "") {   alert('Falta el siguiente dato: Contraseña.'); return; }
  datos.tipo = true;


  const request = await fetch('api/usuarios', {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("La cuenta fue creada con exito!");
  window.location.href = 'login_admin.html'

}
