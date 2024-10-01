package com.leilao.backend.controller;

import com.leilao.backend.model.Person;
import com.leilao.backend.service.PersonService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/submit")
    public Person create(@RequestBody Person person) { return personService.create(person);}

    @PostMapping
    public Person update(@RequestBody Person person) {return personService.create(person);}

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) { personService.delete(id);}
}
