package com.leilao.backend.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.model.Auction;
import com.leilao.backend.model.Person;
import com.leilao.backend.repository.PersonRepository;
import com.leilao.backend.service.AuctionService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/auction")
@CrossOrigin
public class AuctionController {
    
    @Autowired
    private AuctionService auctionService;

    @Autowired
    private PersonRepository personRepository;

    @PostMapping
    public Auction create(@RequestBody Auction auction) {
        String email = auction.getPerson().getEmail();
        Person person = personRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Person not found"));
        auction.setPerson(person);
        return auctionService.create(auction, person);
    }

    @PutMapping("/update")
    public Auction update(@RequestBody Auction auction) {
        return auctionService.update(auction);
    }

    @GetMapping("/listAll")
    public List<Auction> listAll() {
        return auctionService.listAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        auctionService.delete(id);
    }

    @GetMapping("/find")
    public String find(@PathParam("name") String name, @PathParam("age") Integer age) {
        System.out.println(name + " " + age);
        return name + " " + age; 
    }

    @PostMapping("/{auctionId}/images")
    public ResponseEntity<Auction> addImageToAuction(@PathVariable Long auctionId, @RequestParam LocalDateTime registrationDateTime, @RequestParam String imageName) {
        Auction updatedAuction = auctionService.addImagem(auctionId, registrationDateTime, imageName);
        return ResponseEntity.ok(updatedAuction);
    }

}