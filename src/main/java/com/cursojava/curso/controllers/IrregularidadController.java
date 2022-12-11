package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.IrregularidadDao;
import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Irregularidad;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IrregularidadController {

    @Autowired
    private IrregularidadDao irregularidadDao;

    @Autowired
    private JWTUtil jwtUtil;
    @RequestMapping(value = "api/irregularidades", method = RequestMethod.GET)
    public List<Irregularidad> getIrregularidades(@RequestHeader(value="Authorization") String token) {
        if (!validarToken(token)) { return null; }

        return irregularidadDao.getIrregularidad();
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/irregularidades", method = RequestMethod.POST)
    public void registrarIrregularidad(@RequestBody Irregularidad irregularidad) {



        irregularidadDao.registrar(irregularidad);
    }

    @RequestMapping(value = "api/irregularidades/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value="Authorization", required=false) String token,
                          @PathVariable Long id) {
        if (!validarToken(token)) { return; }
        irregularidadDao.eliminar(id);
    }

    @RequestMapping(value = "api/irregularidad_modified/{id}", method = RequestMethod.POST )
    public void modificar(@RequestBody Irregularidad irregularidad , @RequestHeader(value="Authorization", required=false)
    @PathVariable Long id){
        irregularidadDao.modificar(irregularidad, id);
    }

}
