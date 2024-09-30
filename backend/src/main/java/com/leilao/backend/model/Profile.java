package com.leilao.backend.model;

import lombok.Data;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Data @Entity @Table(name = "profile")
public class Profile {
    
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Id private Long id_profile;

    @Column(name = "name")
    private String name;
}
