package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.CasoDao;


import com.cursojava.curso.models.Caso;



import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CasoController {

    @Autowired
    private CasoDao casoDao;

    @Autowired
    private JWTUtil jwtUtil;
    @RequestMapping(value = "api/casos", method = RequestMethod.GET)
    public List<Caso> getCasos(@RequestHeader(value="Authorization") String token) {
        if (!validarToken(token)) { return null; }

        return casoDao.getCasos();
    }

    private boolean validarToken(String token) {
        String casoId = jwtUtil.getKey(token);
        return casoId != null;
    }

    @RequestMapping(value = "api/casos", method = RequestMethod.POST)
    public void registrarCaso(@RequestBody Caso caso) {


        casoDao.registrar(caso);
    }

    @RequestMapping(value = "api/casos/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value="Authorization", required=false) String token,
                          @PathVariable Long id) {
        if (!validarToken(token)) { return; }
       casoDao.eliminar(id);
    }

    @RequestMapping(value = "api/caso_modified/{id}", method = RequestMethod.POST )
    public void modificar(@RequestBody Caso caso ,@RequestHeader(value="Authorization", required=false)
    @PathVariable Long id){
        casoDao.modificar(caso, id);
    }

    @RequestMapping(value = "api/caso_cerrado/{id}", method = RequestMethod.GET )
    public void cerrar(@PathVariable Long id){
        casoDao.cerrar(id);
    }
    @RequestMapping(value = "api/re_abrir_caso/{id}", method = RequestMethod.GET )
    public void re_abrir(@PathVariable Long id){
        casoDao.re_abrir(id);
    }
}
