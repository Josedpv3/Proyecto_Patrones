package com.cursojava.curso.dao;

import com.cursojava.curso.models.Brecha;
import com.cursojava.curso.models.Equipos_Robados;

import java.util.List;

public interface Equipos_RobadosDao {

    List<Equipos_Robados> getEquipos_Robados();

    void eliminar(Long id);

    void registrar(Equipos_Robados equipos_robados);

    void modificar(Equipos_Robados equipos_robados, Long id);
}
