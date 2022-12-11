package com.cursojava.curso.dao;

import com.cursojava.curso.models.Brecha;
import com.cursojava.curso.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class BrechaDaoImp implements BrechaDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Brecha> getBrecha() {
        String query = "FROM Brecha";

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Brecha brecha = entityManager.find(Brecha.class, id);
        entityManager.remove(brecha);
    }

    @Override
    public void registrar(Brecha brecha) {
        entityManager.merge(brecha);
    }

    public void modificar(Brecha  cambio, Long id) {
        Brecha brecha = entityManager.find(Brecha.class, id);

        if(cambio.getTipo() != null){brecha.setTipo(cambio.getTipo());}
        if(cambio.getSubtipo() != null){brecha.setSubtipo(cambio.getSubtipo());}


        entityManager.merge(brecha);
    }

}
