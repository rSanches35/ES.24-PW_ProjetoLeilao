package com.leilao.backend.model;

import lombok.Data;
import lombok.Setter;
import java.util.List;
import lombok.AccessLevel;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Data @Entity @Table(name = "person")
public class Person {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private Long id_person;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password") @JsonIgnore
    private String password;

    @Column(name = "validatin_code")
    private String validatinCode;

    @Column(name = "validatin_code_date")
    private LocalDateTime validationCodeDate;

    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.ALL)
    @Setter(value = AccessLevel.NONE)
    private List<PersonProfile> personProfile;

    public void setPersonProfile(List<PersonProfile> list){
        for(PersonProfile person:list) { person.setPerson(this);} personProfile = list;
    }
}
