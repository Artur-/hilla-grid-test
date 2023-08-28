package com.example.application.endpoints.helloreact;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import com.vaadin.exampledata.DataType;

@Entity
public class Person {

    @Id
    @GeneratedValue
    private Long id;

    private String firstName, lastName;

    public String getFirstName() {
        return firstName;
    }

    @ExampleData(Type.FIRST_NAME)
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @ExampleData(Type.LAST_NAME)
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
