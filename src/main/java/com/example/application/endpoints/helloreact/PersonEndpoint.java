package com.example.application.endpoints.helloreact;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.LocalDateTime;

import dev.hilla.Endpoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
            for (Method m : Person.class.getMethods()) {
                ExampleData annotation = m.getAnnotation(ExampleData.class);
                if (annotation != null) {
                    generator.setData((instance, value) -> {
                        try {
                            m.invoke(instance, value);
                        } catch (IllegalAccessException
                                | IllegalArgumentException
                                | InvocationTargetException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }, annotation.value().getDataType());
                }
            }
            repo.saveAll(generator.create(100, 0));
        }
    }

    public Page<Person> list(Pageable pageable) {
        return repo.findAll(pageable);

    }
}
