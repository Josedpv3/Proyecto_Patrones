package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.BrechaDao;
import com.cursojava.curso.dao.EmpresaDao;
import com.cursojava.curso.models.Brecha;
import com.cursojava.curso.models.Empresa;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmpresaController {

    @Autowired
    private EmpresaDao empresaDao;

    @Autowired
    private JWTUtil jwtUtil;
    @RequestMapping(value = "api/empresas", method = RequestMethod.GET)
    public List<Empresa> getEmpresas(@RequestHeader(value="Authorization") String token) {
        if (!validarToken(token)) { return null; }

        return empresaDao.getEmpresa();
    }

    private boolean validarToken(String token) {
        String BrechaId = jwtUtil.getKey(token);
        return BrechaId != null;
    }

    @RequestMapping(value = "api/empresas", method = RequestMethod.POST)
    public void registrarEmpresa(@RequestBody Empresa empresa) {


        empresaDao.registrar(empresa);
    }

    @RequestMapping(value = "api/empresas/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value="Authorization", required=false) String token,
                          @PathVariable Long id) {
        if (!validarToken(token)) { return; }
        empresaDao.eliminar(id);
    }

    @RequestMapping(value = "api/empresa_modified/{id}", method = RequestMethod.POST )
    public void modificar(@RequestBody Empresa empresa , @RequestHeader(value="Authorization", required=false)
    @PathVariable Long id){
        empresaDao.modificar(empresa, id);
    }

}
