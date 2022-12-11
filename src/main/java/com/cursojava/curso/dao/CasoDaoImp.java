package com.cursojava.curso.dao;

import com.cursojava.curso.models.Caso;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@Transactional
public class CasoDaoImp implements CasoDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Caso> getCasos() {
        String query = "FROM Caso";

        return entityManager.createQuery(query).getResultList();
    }
    public List<Caso> getBandejaCasos(Caso caso) {
        String query = "FROM Caso WHERE tipo = :tipo";

        return entityManager.createQuery(query).setParameter("tipo", caso.getTipo()).getResultList();
    }
    @Override
    public void eliminar(Long id) {
        Caso caso = entityManager.find(Caso.class, id);
        entityManager.remove(caso);
    }

    @Override
    public void cerrar(Long id) {
        Caso caso = entityManager.find(Caso.class, id);
        caso.setEstado(3L);

        entityManager.merge(caso);
    }

    @Override
    public void re_abrir(Long id) {
        Caso caso = entityManager.find(Caso.class, id);
        caso.setEstado(4L);

        entityManager.merge(caso);
    }

    @Override
    public void registrar(Caso caso) {
        caso.setFecha(LocalDateTime.now());
        caso.setDias(0L);
        entityManager.merge(caso);
    }



        public void modificar(Caso cambio, Long id) {
            Caso caso = entityManager.find(Caso.class, id);

            if(cambio.getInvestigador() != null){caso.setInvestigador(cambio.getInvestigador());}
            if(cambio.getEstado() != null){caso.setEstado(cambio.getEstado());}
            if(cambio.getId_caso_relacionado() != null){caso.setId_caso_relacionado(cambio.getId_caso_relacionado());}
            if(cambio.getId_brecha() != null){caso.setId_brecha(cambio.getId_brecha());}
            if(cambio.getId_proyecto() != null){caso.setId_proyecto(cambio.getId_proyecto());}
            if(cambio.getEmpresa() != null){caso.setEmpresa(cambio.getEmpresa());}
            if(cambio.getTipo() != null){caso.setTipo(cambio.getTipo());}
            if(cambio.getDias() != null){caso.setDias(cambio.getDias());}
            if(cambio.getId_irregularidad() != null){caso.setId_irregularidad(cambio.getId_irregularidad());}
            if(cambio.getObjetivo() != null){caso.setObjetivo(cambio.getObjetivo());}
            if(cambio.getIncidencia() != null){caso.setIncidencia(cambio.getIncidencia());}
            if(cambio.getOperandi() != null){caso.setOperandi(cambio.getOperandi());}
            if(cambio.getArea() != null){caso.setArea(cambio.getArea());}
            if(cambio.getDeteccion() != null){caso.setDeteccion(cambio.getDeteccion());}
            if(cambio.getDiagnostico() != null){caso.setDiagnostico(cambio.getDiagnostico());}
            if(cambio.getAcciones() != null){caso.setAcciones(cambio.getAcciones());}
            if(cambio.getConclusiones() != null){caso.setConclusiones(cambio.getConclusiones());}
            if(cambio.getObservaciones() != null){caso.setObservaciones(cambio.getObservaciones());}
            if(cambio.getSoporte() != null){caso.setSoporte(cambio.getSoporte());}
           entityManager.merge(caso);
        }
}
