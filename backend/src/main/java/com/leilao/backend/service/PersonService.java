package com.leilao.backend.service;

import com.leilao.backend.model.Person;
import com.leilao.backend.model.dto.PersonChangePasswordDTO;
import com.leilao.backend.model.dto.PersonVerifyCodeDTO;
import com.leilao.backend.repository.PersonRepository;

import java.util.Random;
import org.thymeleaf.context.Context;
import jakarta.mail.MessagingException;

import java.time.LocalDateTime;
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

    public String codeGenerate() {

        return ("" + (100000 + random.nextInt(900000)));
    }

    public Person create(Person person) {

        String code = codeGenerate();
        person.setAccountCode(code);

        Person personCreated;
        personCreated = personRepository.save(person);

        Context context = new Context();
        context.setVariable("name", personCreated.getName());
        context.setVariable("code", code);

        try {
            emailService.sendTemplateEmail(personCreated.getEmail(), "Cadastro Realizdo!", context, "emailWelcome");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return personCreated;
    }

    /*
     * public Person recoverPassword(String email) {
     * 
     * Person person = personRepository.findByEmail(email).orElseThrow(() -> new
     * UsernameNotFoundException("User not Found"));
     * 
     * String code = codeGenerate();
     * 
     * person.setValidationCode(code);
     * person.setValidationCodeDate(LocalDateTime.now().plusMinutes(5));
     * personRepository.save(person);
     * 
     * Context context = new Context();
     * context.setVariable("name", person.getName());
     * context.setVariable("code", code);
     * 
     * try {
     * emailService.sendTemplateEmail(person.getEmail(), "Recuperar", context,
     * "emailRecover");
     * } catch (MessagingException e) {
     * e.printStackTrace();
     * }
     * 
     * return person;
     * }
     * 
     * public Person changePassword(PersonChangePasswordDTO dto){
     * 
     * Person person = personRepository.findByEmail(dto.getEmail()).orElseThrow(()
     * -> new UsernameNotFoundException("User not Found"));
     * 
     * if(dto.getValidationCode().equals(person.getValidationCode()) &&
     * person.getValidationCodeDate().isAfter(LocalDateTime.now())){
     * 
     * person.setPassword(dto.getPassword());
     * person.setValidationCodeDate(null);
     * 
     * personRepository.save(person);
     * return person;
     * }
     * else { throw new IllegalArgumentException("Invalid Validation Code");}
     * }
     */

    public String recoverSendEmail(String email) {

        System.out.println(email);
        Person user = personRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));

        String code = codeGenerate();

        user.setValidationCode(code);
        user.setValidationCodeDate(LocalDateTime.now().plusMinutes(5));
        personRepository.save(user);

        Context context = new Context();
        context.setVariable("name", user.getName());
        context.setVariable("code", code);

        try {
            emailService.sendTemplateEmail(user.getEmail(), "Recuperar Senha!", context, "emailRecover");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return "Email enviado!";
    }

    // --------------- RECOVER VALIDATION CODE ---------------

    public Person recoverVerifyCode(PersonVerifyCodeDTO dto) {

        Person user = personRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));

        if (user.getValidationCode().equals(dto.getCode()) && user.getValidationCodeDate().isAfter(LocalDateTime.now())) {

            user.setValidationCode(null);
            user.setValidationCodeDate(null);

            personRepository.save(user);
            return user;
        } else {
            throw new IllegalArgumentException("Invalid Validation Code");
        }
    }

    // --------------- RECOVER CHANGE PASSWORD ---------------

    public Person recoverChangePassword(PersonChangePasswordDTO dto) {

        Person person = personRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));

        person.setPassword(dto.getPassword());

        personRepository.save(person);
        return person;
    }

    public Person activate(PersonVerifyCodeDTO dto) {

        Person user = personRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));

        if (user.getAccountCode().equals(dto.getCode())) {

            user.setActive(true);
            user.setAccountCode("-1");

            personRepository.save(user);
            return user;
        } else {
            throw new IllegalArgumentException("Invalid Validation Code");
        }
    }

    public Person update(Person person) {

        Person personSaved = personRepository.findById(person.getId_person())
                .orElseThrow(() -> new NoSuchElementException("Objeto não Encontrado"));
        personSaved.setName(person.getName());
        personSaved.setEmail(person.getEmail());
        return personRepository.save(personSaved);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));
    }
}
