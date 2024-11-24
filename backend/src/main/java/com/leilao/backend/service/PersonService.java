package com.leilao.backend.service;

import com.leilao.backend.model.Person;
import com.leilao.backend.repository.PersonRepository;

import java.util.Random;
import org.thymeleaf.context.Context;
import jakarta.mail.MessagingException;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@Service
public class PersonService implements UserDetailsService {
    
    Random random = new Random();

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    public String codeGenerate(){

        return ("" + (100000 + random.nextInt(900000)));
    }

    public Person create(Person person) { 

        String code = codeGenerate();
        person.setValidationCode(code);

        Person personCreated;
        personCreated = personRepository.save(person);
        
        Context context = new Context();
        context.setVariable("name", personCreated.getName());
        context.setVariable("code", code);

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







    
    
