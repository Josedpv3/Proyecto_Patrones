package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.ProyectoDao;

import com.cursojava.curso.models.Proyecto;

import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProyectoController {

    @Autowired
    private ProyectoDao proyectoDao;

    @Autowired
    private JWTUtil jwtUtil;
    @RequestMapping(value = "api/proyectos", method = RequestMethod.GET)
    public List<Proyecto> getproyectos(@RequestHeader(value="Authorization") String token) {
        if (!validarToken(token)) { return null; }

        return proyectoDao.getProyecto();
    }

    private boolean validarToken(String token) {
        String proyectoId = jwtUtil.getKey(token);
        return proyectoId != null;
    }


    @RequestMapping(value = "api/proyectos", method = RequestMethod.POST)
    public void registrarProyecto(@RequestBody Proyecto proyecto) {
        

        proyectoDao.registrar(proyecto);
    }

    @RequestMapping(value = "api/proyectos/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value="Authorization", required=false) String token,
                          @PathVariable Long id) {
        if (!validarToken(token)) { return; }
       proyectoDao.eliminar(id);
    }

    @RequestMapping(value = "api/proyecto_modified/{id}", method = RequestMethod.POST )
    public void modificar(@RequestBody Proyecto proyecto , @RequestHeader(value="Authorization", required=false)
    @PathVariable Long id){
        proyectoDao.modificar(proyecto, id);
    }

}
