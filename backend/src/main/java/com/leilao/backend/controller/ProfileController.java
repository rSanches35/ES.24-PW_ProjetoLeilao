package com.leilao.backend.controller;

import com.leilao.backend.model.Profile;
import com.leilao.backend.service.ProfileService;

import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    
    @Autowired
    private ProfileService profileService;

    @PostMapping("/submit")
    public Profile create(@RequestBody Profile profile) { return profileService.create(profile);}

    @PutMapping
    public Profile update(@RequestBody Profile profile) { return profileService.create(profile);}

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) { profileService.delete(id);}

    @GetMapping
    public List<Profile> listAll(){ return profileService.listAll();}
}
