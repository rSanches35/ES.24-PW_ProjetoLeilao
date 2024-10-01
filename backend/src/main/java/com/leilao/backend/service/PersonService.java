package com.leilao.backend.service;

import com.leilao.backend.model.Person;
import com.leilao.backend.repository.PersonRepository;

import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class PersonService {
    
    @Autowired
    private PersonRepository personRepository;

    public Person create(Person person) { return personRepository.save(person);}

    public Person update(Person person) {

        Person personSaved = personRepository.findById(person.getId_person())
            .orElseThrow(()-> new NoSuchElementException("Objeto não Encontrado"));
        personSaved.setName(person.getName());
        personSaved.setEmail(person.getEmail());
        return personRepository.save(personSaved);
    }
}







    
    
