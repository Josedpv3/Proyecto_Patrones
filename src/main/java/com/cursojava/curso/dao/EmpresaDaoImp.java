package com.cursojava.curso.dao;

import com.cursojava.curso.models.Brecha;
import com.cursojava.curso.models.Empresa;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class EmpresaDaoImp implements EmpresaDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Empresa> getEmpresa() {
        String query = "FROM Empresa";

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Empresa empresa = entityManager.find(Empresa.class, id);
        entityManager.remove(empresa);
    }

    @Override
    public void registrar(Empresa empresa) {
        entityManager.merge(empresa);
    }

    public void modificar(Empresa  cambio, Long id) {
        Empresa brecha = entityManager.find(Empresa.class, id);

        if(cambio.getNombre() != null){brecha.setNombre(cambio.getNombre());}



        entityManager.merge(brecha);
    }

}
