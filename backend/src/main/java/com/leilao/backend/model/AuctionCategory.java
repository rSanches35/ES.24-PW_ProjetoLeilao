package com.leilao.backend.model;

import lombok.Data;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Data @Entity @Table(name = "auction_category")
public class AuctionCategory {
  
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Id private Long id_person_profile;

    @ManyToOne @JoinColumn(name = "id_auction")
    private Auction auction;

    @ManyToOne @JoinColumn(name = "id_category") @JsonIgnore
    private Category category;
}
