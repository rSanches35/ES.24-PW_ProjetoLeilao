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
import com.leilao.backend.repository.PersonRepository;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Executable;
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

    /* 
    @PostMapping("/password-code-request")
    public String passwordCodeRequest(@RequestBody PersonAuthRequestDTO person) {
        return personService.passwordCodeRequest(person);
    }
    */

    @PostMapping
    public Person create(@Valid @RequestBody Person person) {

        return personService.create(person);
    }

    @PutMapping
    public Person update(@Valid @RequestBody Person person) {
        return personService.create(person);
    }

    @PostMapping("/recover")
    public Person recover(@RequestBody Map<String, String> request){

        String email = request.get("email");
        return personService.recoverPassword(email);
    }

    @PostMapping("/change")
    public Person change(@RequestBody PersonChangePasswordDTO dto){

        return personService.changePassword(dto);
    }

    @PostMapping("/activate")
    public Person activate(@RequestBody Map<String, String> request){

        String validationCode = request.get("validationCode");
        return personService.activate(validationCode);
    }
}