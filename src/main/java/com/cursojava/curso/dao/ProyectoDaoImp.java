package com.cursojava.curso.dao;


import com.cursojava.curso.models.Irregularidad;
import com.cursojava.curso.models.Proyecto;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class ProyectoDaoImp implements ProyectoDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Proyecto> getProyecto() {
        String query = "FROM Proyecto";

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Proyecto proyecto = entityManager.find(Proyecto.class, id);
        entityManager.remove(proyecto);
    }

    @Override
    public void registrar(Proyecto proyecto) {
        entityManager.merge(proyecto);
    }

    public void modificar(Proyecto  cambio, Long id) {
        Proyecto proyecto = entityManager.find(Proyecto.class, id);

        if(cambio.getTipo() != null){proyecto.setTipo(cambio.getTipo());}
        if(cambio.getSubtipo() != null){proyecto.setSubtipo(cambio.getSubtipo());}

        entityManager.merge(proyecto);
    }

}
