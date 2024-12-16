package com.leilao.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.Auction;
import com.leilao.backend.model.Image;
import com.leilao.backend.model.Person;
import com.leilao.backend.repository.AuctionRepository;

@Service
public class AuctionService {
    
    @Autowired
    private AuctionRepository auctionRepository;

    public Auction create(Auction auction, Person person) {

        auction.setPerson(person);
        //auction.setCategory(category);
        auction.setStartDateTime(LocalDateTime.now());

        return auctionRepository.save(auction);
    }

    public Auction update(Auction auction) {

        Auction auctionSaved = auctionRepository.findById(auction.getIdAuction()).orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));

        auctionSaved.setTitle(auction.getTitle());
        auctionSaved.setDescription(auction.getDescription());
        auctionSaved.setStartDateTime(auction.getStartDateTime());
        auctionSaved.setEndDateTime(auction.getEndDateTime());
        auctionSaved.setStatus(auction.getStatus());
        auctionSaved.setObservation(auction.getObservation());
        auctionSaved.setIncrementValue(auction.getIncrementValue());
        auctionSaved.setMinimumBid(auction.getMinimumBid());
        auctionSaved.setCategory(auction.getCategory());

        return auctionRepository.save(auctionSaved);
    }

    public void delete(Long id) {

        Auction auctionSaved = auctionRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        auctionRepository.delete(auctionSaved);
    }

    public List<Auction> listAll() { return auctionRepository.findAll();}

    public Auction addImagem(Long auctionId, LocalDateTime registrationDateTime, String imageName){

        Auction auction = auctionRepository.findById(auctionId).orElseThrow(() -> new NoSuchElementException("Auction not found"));

        Image image = new Image();

        image.setAuction(auction);
        image.setRegistrationDateTime(registrationDateTime);
        image.setName(imageName);
        auction.getImages().add(image);

        return auctionRepository.save(auction);
    }
}