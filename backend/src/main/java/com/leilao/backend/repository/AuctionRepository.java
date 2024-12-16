package com.leilao.backend.repository;

import java.util.Optional;
import java.util.Locale.Category;
import com.leilao.backend.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    Optional<Auction> findByTitle(String title);
    Optional<Auction> findByCategory(Category category);
}