package com.cursojava.curso.dao;


import com.cursojava.curso.models.Irregularidad;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class IrregularidadDaoImp implements IrregularidadDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Irregularidad> getIrregularidad() {
        String query = "FROM Irregularidad";

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Irregularidad irregularidad = entityManager.find(Irregularidad.class, id);
        entityManager.remove(irregularidad);
    }

    @Override
    public void registrar(Irregularidad irregularidad) {
        entityManager.merge(irregularidad);
    }

    public void modificar(Irregularidad  cambio, Long id) {
        Irregularidad irregularidad = entityManager.find(Irregularidad.class, id);

        if(cambio.getTipo() != null){irregularidad.setTipo(cambio.getTipo());}
        if(cambio.getSubtipo() != null){irregularidad.setSubtipo(cambio.getSubtipo());}

        entityManager.merge(irregularidad);
    }

}
