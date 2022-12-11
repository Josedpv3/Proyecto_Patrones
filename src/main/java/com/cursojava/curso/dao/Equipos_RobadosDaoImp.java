package com.cursojava.curso.dao;

import com.cursojava.curso.models.Brecha;
import com.cursojava.curso.models.Equipos_Robados;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class Equipos_RobadosDaoImp implements Equipos_RobadosDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Equipos_Robados> getEquipos_Robados() {
        String query = "FROM Equipos_Robados";

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Equipos_Robados equipos_robados = entityManager.find(Equipos_Robados.class, id);
        entityManager.remove(equipos_robados);
    }

    @Override
    public void registrar(Equipos_Robados equipos_robados) {
        entityManager.merge(equipos_robados);
    }

    public void modificar(Equipos_Robados  cambio, Long id) {
        Equipos_Robados equipos_robados = entityManager.find(Equipos_Robados.class, id);

        if(cambio.getTipo() != null){equipos_robados.setTipo(cambio.getTipo());}
        if(cambio.getEmpresa() != null){equipos_robados.setEmpresa(cambio.getEmpresa());}
        if(cambio.getMarca() != null){equipos_robados.setMarca(cambio.getMarca());}
        if(cambio.getObservaciones() != null){equipos_robados.setObservaciones(cambio.getObservaciones());}
        if(cambio.getModelo() != null){equipos_robados.setModelo(cambio.getModelo());}

        entityManager.merge(equipos_robados);
    }

}
