package com.leilao.backend.controller;

import com.leilao.backend.model.Person;
import com.leilao.backend.security.JwtService;
import com.leilao.backend.service.PersonService;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.leilao.backend.model.dto.PersonAuthRequestDTO;
import com.leilao.backend.model.dto.PersonAuthResponseDTO;
import com.leilao.backend.model.dto.PersonChangePasswordDTO;
import com.leilao.backend.model.dto.PersonVerifyCodeDTO;
import com.leilao.backend.repository.PersonRepository;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


@RestController
@RequestMapping("/api/person")
@CrossOrigin
public class PersonController {

    @Autowired
    private PersonService personService;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public PersonAuthResponseDTO authenticateUser(@RequestBody PersonAuthRequestDTO authRequest) {

        Person person = personRepository.findByEmail(authRequest.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not Found"));

        if(person.isActive()){

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
            return new PersonAuthResponseDTO(
                authRequest.getEmail(), jwtService.generateToken(authentication.getName()));
        }
        else { throw new IllegalArgumentException("User not Active");}
    }

    @PostMapping
    public Person create(@Valid @RequestBody Person person) {
        return personService.create(person);
    }

    @PutMapping
    public Person update(@Valid @RequestBody Person person) {
        return personService.create(person);
    }

    @PostMapping("/recover-email")
    public String recoverSendEmail(@RequestBody Map<String, String> json){
        String email = json.get("email");
        return personService.recoverSendEmail(email);
    }

    @PostMapping("/recover-code")
    public Person recoverVerifyCode(@RequestBody PersonVerifyCodeDTO dto){

        return personService.recoverVerifyCode(dto);
    }

    @PostMapping("/recover-change")
    public Person recoverChangePassword(@RequestBody PersonChangePasswordDTO dto){

        return personService.recoverChangePassword(dto);
    }

    @PostMapping("/activate")
    public Person activate(@RequestBody PersonVerifyCodeDTO dto){

        return personService.activate(dto);
    }
}