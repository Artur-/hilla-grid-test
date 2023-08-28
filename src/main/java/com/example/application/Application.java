package com.example.application;

import jakarta.annotation.PostConstruct;

import com.example.application.endpoint.Person;
import com.example.application.endpoint.PersonRepository;
import com.example.application.util.RepoInit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;

@SpringBootApplication
@Theme(value = "grid-binding")
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Autowired
    private PersonRepository personRepo;

    @PostConstruct
    public void initRepos() {
        RepoInit.initIfNeeded(personRepo, Person.class);

    }
}
