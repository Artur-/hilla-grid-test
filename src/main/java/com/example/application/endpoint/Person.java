package com.example.application.endpoint;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.application.util.ExampleData;
import com.example.application.util.Type;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Email
    private String email;
    
    private LocalDate dateOfBirth;

    @CustomFormatter("intToEuros")
    private int salary;

    // @NumberFormat(pattern = "#0,00 €")
    private BigDecimal taxesPaid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    @ExampleData(Type.NAME)
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    @ExampleData(Type.EMAIL)
    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    @ExampleData(Type.DATE_OF_BIRTH)
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getSalary() {
        return salary;
    }

    @ExampleData(Type.SALARY)
    public void setSalary(int salary) {
        this.salary = salary;
    }

    public BigDecimal getTaxesPaid() {
        return taxesPaid;
    }

    public void setTaxesPaid(BigDecimal taxesPaid) {
        this.taxesPaid = taxesPaid;
    }

}
