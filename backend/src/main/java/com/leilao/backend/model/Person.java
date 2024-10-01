package com.leilao.backend.model;

import lombok.Data;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Data @Entity @Table(name = "person")
public class Person {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private Long id_person;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "validatin_code")
    private String validatinCode;

    @Column(name = "validatin_code_date")
    private LocalDateTime validationCodeDate;
}
