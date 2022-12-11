package com.cursojava.curso.dao;

import com.cursojava.curso.models.Empresa;
import com.cursojava.curso.models.Usuario;

import java.util.List;

public interface EmpresaDao {

    List<Empresa> getEmpresa();

    void eliminar(Long id);

    void registrar(Empresa empresa);

    void modificar(Empresa empresa, Long id);
}
