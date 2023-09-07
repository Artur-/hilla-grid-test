package com.example.application.endpoint;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

import com.example.application.util.RepoInit;
import dev.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.server.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
// @ConditionalOnBean(DEvMode)
public class HillaDevelopmentEndpoint {

    @Autowired
    private EntityManager em;

    @Transactional
    public void deleteData(String type) throws ClassNotFoundException {
        // TODO Limit to when using H2 and requests from localhost
        em.createQuery("DELETE FROM " + type).executeUpdate();
    }

    @Transactional
    public void generateData(String type, int count)
            throws ClassNotFoundException {
        // TODO Limit to when using H2 and requests from localhost
        List data = RepoInit.createData(type, count);
        for (Object o : data) {
            em.persist(o);
        }
    }
}
