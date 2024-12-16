package com.leilao.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Data @Entity @Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImage;

    @ManyToOne
    @JoinColumn(name = "id_auction")
    private Auction auction;

    @Column(name = "name")
    private String name;

    @Column(name = "registration_nate_time")
    private LocalDateTime registrationDateTime;
}