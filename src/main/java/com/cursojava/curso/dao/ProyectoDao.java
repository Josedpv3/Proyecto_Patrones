package com.cursojava.curso.dao;

import com.cursojava.curso.models.Empresa;
import com.cursojava.curso.models.Proyecto;

import java.util.List;

public interface ProyectoDao {

    List<Proyecto> getProyecto();

    void eliminar(Long id);

    void registrar(Proyecto proyecto);

    void modificar(Proyecto proyecto, Long id);
}
