package com.cursojava.curso.dao;

import com.cursojava.curso.models.Caso;



import java.util.List;

public interface CasoDao {

    List<Caso> getCasos();

    List<Caso> getBandejaCasos(Caso caso);

    void eliminar(Long id);

    void registrar(Caso caso);

    void modificar(Caso caso, Long id);

    void cerrar(Long id);

    void re_abrir(Long id);
}
