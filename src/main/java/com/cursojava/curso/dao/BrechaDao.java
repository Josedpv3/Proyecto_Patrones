package com.cursojava.curso.dao;

import com.cursojava.curso.models.Brecha;
import com.cursojava.curso.models.Empresa;

import java.util.List;

public interface BrechaDao {

    List<Brecha> getBrecha();

    void eliminar(Long id);

    void registrar(Brecha brecha);

    void modificar(Brecha brecha, Long id);
}
