package com.cursojava.curso.dao;

import com.cursojava.curso.models.Equipos_Robados;
import com.cursojava.curso.models.Personal_amonestado;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class Personal_amonestadoDaoImp implements Personal_amonestadoDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Personal_amonestado> getPersonal_amonestado() {
        String query = "FROM Personal_amonestado";

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Personal_amonestado personal_amonestado = entityManager.find(Personal_amonestado.class, id);
        entityManager.remove(personal_amonestado);
    }

    @Override
    public void registrar(Personal_amonestado personal_amonestado) {
        entityManager.merge(personal_amonestado);
    }

    public void modificar(Personal_amonestado  cambio, Long id) {
        Personal_amonestado personal_amonestado = entityManager.find(Personal_amonestado.class, id);

        if(cambio.getCi() != null){personal_amonestado.setCi(cambio.getCi());}
        if(cambio.getEmpresa() != null){personal_amonestado.setEmpresa(cambio.getEmpresa());}
        if(cambio.getNombre() != null){personal_amonestado.setNombre(cambio.getNombre());}
        if(cambio.getApellido() != null){personal_amonestado.setApellido(cambio.getApellido());}
        if(cambio.getCaso() != null){personal_amonestado.setCaso(cambio.getCaso());}

        entityManager.merge(personal_amonestado);
    }

}
