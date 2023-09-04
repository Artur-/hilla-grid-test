package com.example.application.endpoint;

import java.util.List;

import com.example.application.util.PropertyFilter;
import com.example.application.util.Filter;
import com.example.application.util.FilterUtil;
import dev.hilla.Endpoint;
import dev.hilla.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.vaadin.flow.server.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint {

    private PersonRepository repo;

    public PersonEndpoint(PersonRepository repo) {
        this.repo = repo;
    }

    public Page<Person> list(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public Page<Person> list(Pageable pageable, @Nullable Filter filter) {
        Specification spec = FilterUtil.toSpec(filter);
        return repo.findAll(spec, pageable);
    }

    public Person update(Person person) {
        return repo.save(person);
    }

}
