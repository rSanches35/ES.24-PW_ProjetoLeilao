package com.leilao.backend.service;

import com.leilao.backend.model.Person;
import com.leilao.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;

import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@Service
public class PersonService implements UserDetailsService {
    
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    public Person create(Person person) { 

        person.setValidationCode("123");
        Person personCreated;
        personCreated = personRepository.save(person);
        Context context = new Context();
        context.setVariable("name", personCreated.getName());

        context.setVariable("code", "123");

        try {
            emailService.sendTemplateEmail(personCreated.getEmail(), "Cadastro", context, "emailWelcome");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return personCreated;
    }

    public Person update(Person person) {

        Person personSaved = personRepository.findById(person.getId_person())
            .orElseThrow(()-> new NoSuchElementException("Objeto não Encontrado"));
        personSaved.setName(person.getName());
        personSaved.setEmail(person.getEmail());
        return personRepository.save(personSaved);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not Found"));
    }
}







    
    
