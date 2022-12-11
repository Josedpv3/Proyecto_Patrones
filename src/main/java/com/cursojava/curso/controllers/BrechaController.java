package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.BrechaDao;
import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Brecha;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BrechaController {

    @Autowired
    private BrechaDao brechaDao;

    @Autowired
    private JWTUtil jwtUtil;
    @RequestMapping(value = "api/brechas", method = RequestMethod.GET)
    public List<Brecha> getBrechas(@RequestHeader(value="Authorization") String token) {
        if (!validarToken(token)) { return null; }

        return brechaDao.getBrecha();
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/brechas", method = RequestMethod.POST)
    public void registrarBrecha(@RequestBody Brecha brecha) {



        brechaDao.registrar(brecha);
    }

    @RequestMapping(value = "api/brechas/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value="Authorization", required=false) String token,
                          @PathVariable Long id) {
        if (!validarToken(token)) { return; }
        brechaDao.eliminar(id);
    }

    @RequestMapping(value = "api/brecha_modified/{id}", method = RequestMethod.POST )
    public void modificar(@RequestBody Brecha brecha , @RequestHeader(value="Authorization", required=false)
    @PathVariable Long id){
        brechaDao.modificar(brecha, id);
    }

}
