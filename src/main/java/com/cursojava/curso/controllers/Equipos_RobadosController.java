package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.Equipos_RobadosDao;
import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Equipos_Robados;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Equipos_RobadosController {

    @Autowired
    private Equipos_RobadosDao equipos_robadosDao;

    @Autowired
    private JWTUtil jwtUtil;
    @RequestMapping(value = "api/equipos_robados", method = RequestMethod.GET)
    public List<Equipos_Robados> getEquipos_Robados(@RequestHeader(value="Authorization") String token) {
        if (!validarToken(token)) { return null; }

        return equipos_robadosDao.getEquipos_Robados();
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/equipos_robados", method = RequestMethod.POST)
    public void registrarEquipos_Robados(@RequestBody Equipos_Robados equipos_robados) {


        equipos_robadosDao.registrar(equipos_robados);
    }

    @RequestMapping(value = "api/equipos_robados/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value="Authorization", required=false) String token,
                          @PathVariable Long id) {
        if (!validarToken(token)) { return; }
        equipos_robadosDao.eliminar(id);
    }

    @RequestMapping(value = "api/equipos_robados_modified/{id}", method = RequestMethod.POST )
    public void modificar(@RequestBody Equipos_Robados equipos_robados , @RequestHeader(value="Authorization", required=false)
    @PathVariable Long id){
        equipos_robadosDao.modificar(equipos_robados, id);
    }

}
