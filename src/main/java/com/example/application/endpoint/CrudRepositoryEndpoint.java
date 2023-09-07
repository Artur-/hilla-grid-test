package com.example.application.endpoint;

import jakarta.persistence.MappedSuperclass;

import com.example.application.util.Filter;
import com.example.application.util.FilterUtil;
import dev.hilla.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vaadin.flow.server.auth.AnonymousAllowed;

@MappedSuperclass
@AnonymousAllowed
public class CrudRepositoryEndpoint<T, ID_TYPE> {

    private JpaRepository<T, ID_TYPE> repo;
    @Autowired
    private FilterUtil filterUtil;
    private Class<T> entityClass;

    public <R extends JpaRepository<T, ID_TYPE> & JpaSpecificationExecutor<T>> CrudRepositoryEndpoint(
            Class<T> entityClass, R repo) {
        this.entityClass = entityClass;
        this.repo = repo;
    }

    public Page<T> list(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public Page<T> list(Pageable pageable, @Nullable Filter filter) {
        Specification<T> spec = filterUtil.toSpec(filter, entityClass);
        return ((JpaSpecificationExecutor<T>) repo).findAll(spec, pageable);
    }

    public T update(T person) {
        return repo.save(person);
    }

}
