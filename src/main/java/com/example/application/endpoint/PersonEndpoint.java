package com.example.application.endpoint;

import dev.hilla.Endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint extends CrudRepositoryEndpoint<Person, Long> {

    public PersonEndpoint(PersonRepository repo) {
        super(Person.class, repo);
    }

}
