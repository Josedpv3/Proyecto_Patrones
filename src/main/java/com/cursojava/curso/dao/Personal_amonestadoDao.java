package com.cursojava.curso.dao;

import com.cursojava.curso.models.Irregularidad;
import com.cursojava.curso.models.Personal_amonestado;

import java.util.List;

public interface Personal_amonestadoDao {

    List<Personal_amonestado> getPersonal_amonestado();

    void eliminar(Long id);

    void registrar(Personal_amonestado personal_amonestado);

    void modificar(Personal_amonestado personal_amonestado, Long id);
}
