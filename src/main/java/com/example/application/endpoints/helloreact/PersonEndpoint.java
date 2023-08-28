package com.example.application.endpoints.helloreact;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import dev.hilla.Endpoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vaadin.exampledata.DataType;
import com.vaadin.exampledata.ExampleDataGenerator;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint {

    private PersonRepository repo;

    public PersonEndpoint(PersonRepository repo) {
        this.repo = repo;
        if (repo.count() == 0L) {
            ExampleDataGenerator<Person> generator = new ExampleDataGenerator<>(
                    Person.class, LocalDateTime.of(2022, 1, 2, 1, 2, 3));
            generator.setData(Person::setFirstName, DataType.FIRST_NAME);
            generator.setData(Person::setLastName, DataType.LAST_NAME);
            generator.setData(Person::setDateOfBirth, DataType.DATE_OF_BIRTH);
            repo.saveAll(generator.create(100, 0));
        }
    }

    public Page<Person> list(Pageable pageable) {
        return repo.findAll(pageable);

    }
}
