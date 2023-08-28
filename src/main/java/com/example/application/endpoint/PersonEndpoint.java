package com.example.application.endpoint;

import dev.hilla.Endpoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

}
