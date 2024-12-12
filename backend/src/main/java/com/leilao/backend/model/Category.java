package com.leilao.backend.model;

import lombok.Data;

import jakarta.persistence.Id;

import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled"})
@Data @Entity @Table(name = "auction")
public class Category {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private Long id_category;

    @NotBlank(message =  "Name is Required")
    private String name;

    private String observation;

}
