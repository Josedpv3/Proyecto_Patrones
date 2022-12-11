package com.cursojava.curso.dao;

import com.cursojava.curso.models.Brecha;
import com.cursojava.curso.models.Irregularidad;

import java.util.List;

public interface IrregularidadDao {

    List<Irregularidad> getIrregularidad();

    void eliminar(Long id);

    void registrar(Irregularidad irregularidad);

    void modificar(Irregularidad irregularidad, Long id);
}
