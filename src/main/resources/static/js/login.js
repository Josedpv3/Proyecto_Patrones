$(document).ready(function() {
   // on ready
});


async function iniciarSesion() {
  let datos = {};
  datos.email = document.getElementById('txtEmail').value;
  datos.password = document.getElementById('txtPassword').value;
  datos.investigador = "Investigador";

  const request = await fetch('api/login/investigador', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

   const respuesta = await request.text();
   if (respuesta == 'FAIL') {

   alert("Las credenciales son incorrectas. Por favor intente nuevamente.");

   }
   else
   if(respuesta == 'NO'){

    alert("Las credenciales que ingreso no es de Investigador. Por favor intente nuevamente.");

    }
   else{
         const request = await fetch('user/id', {
           method: 'GET',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },

         });

          const answer = await request.text();
         localStorage.id = answer;
         localStorage.token = respuesta;
         localStorage.email = datos.email;
         localStorage.admin = false;
         window.location.href = 'index.html'

   }

}
