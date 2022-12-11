package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    private long sesion;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login/investigador", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario) {

        Usuario usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        if (usuarioLogueado == null) {
            return "FAIL";
        }
        else
        if (usuarioLogueado.isTipo()== false) {
            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());
            sesion = usuarioLogueado.getId();
            return tokenJwt;
        }else{return "NO";}
    }
    @RequestMapping(value = "api/login/admin", method = RequestMethod.POST)
    public String login_admin(@RequestBody Usuario usuario) {

        Usuario usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        if (usuarioLogueado == null) {
            return "FAIL";
        }
        else
        if (usuarioLogueado.isTipo()== true) {
            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());
            sesion = usuarioLogueado.getId() ;
            return tokenJwt;
        }else{return "NO";}



    }

    @RequestMapping(value = "user/id", method = RequestMethod.GET)
    public long user_id( ) {

        return sesion;



    }
}
