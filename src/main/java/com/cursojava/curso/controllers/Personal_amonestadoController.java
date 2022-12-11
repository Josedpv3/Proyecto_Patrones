package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.Personal_amonestadoDao;
import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Personal_amonestado;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Personal_amonestadoController {

    @Autowired
    private Personal_amonestadoDao personal_amonestadoDao;

    @Autowired
    private JWTUtil jwtUtil;
    @RequestMapping(value = "api/personal_amonestados", method = RequestMethod.GET)
    public List<Personal_amonestado> getPersonal_amonestados(@RequestHeader(value="Authorization") String token) {
        if (!validarToken(token)) { return null; }

        return personal_amonestadoDao.getPersonal_amonestado();
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/personal_amonestados", method = RequestMethod.POST)
    public void registrarPersonal_amonestado(@RequestBody Personal_amonestado personal_amonestado) {


        personal_amonestadoDao.registrar(personal_amonestado);
    }

    @RequestMapping(value = "api/personal_amonestados/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value="Authorization", required=false) String token,
                          @PathVariable Long id) {
        if (!validarToken(token)) { return; }
        personal_amonestadoDao.eliminar(id);
    }

    @RequestMapping(value = "api/personal_amonestado_modified/{id}", method = RequestMethod.POST )
    public void modificar(@RequestBody Personal_amonestado personal_amonestado , @RequestHeader(value="Authorization", required=false)
    @PathVariable Long id){
        personal_amonestadoDao.modificar(personal_amonestado, id);
    }

}
