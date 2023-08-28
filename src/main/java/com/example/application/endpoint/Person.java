package com.example.application.endpoint;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import com.example.application.util.ExampleData;
import com.example.application.util.Type;

@Entity
public class Person {

    @Id
    @GeneratedValue
    private Long id;

    private String firstName, lastName, email;

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

    public String getEmail() {
        return email;
    }

    @ExampleData(Type.EMAIL)
    public void setEmail(String email) {
        this.email = email;
    }
}
