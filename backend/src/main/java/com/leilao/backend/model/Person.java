package com.leilao.backend.model;

import lombok.Data;
import lombok.Setter;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AccessLevel;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled"})
@Data @Entity @Table(name = "person")
public class Person implements UserDetails {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private Long id_person;

    @NotBlank(message =  "Name is Required")
    private String name;

    @Column(unique = true) @NotBlank(message =  "Email is Required")
    private String email;

    @NotBlank(message =  "Password is Required")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name = "validation_code")
    private String validationCode;

    @Column(name = "validation_code_date")
    private LocalDateTime validationCodeDate;

    @Column(name = "active")
    private boolean active;

    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.ALL)
    @Setter(value = AccessLevel.NONE)
    private List<PersonProfile> personProfile;

    @Transient
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void setPassword(String password) {
        this.password = passwordEncoder.encode(password);
    }

    public void setPersonProfile(List<PersonProfile> list){
        for(PersonProfile person:list) { person.setPerson(this);} personProfile = list;
    }

@   Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return personProfile.stream().map(userRole -> new SimpleGrantedAuthority(userRole.getProfile().getName())).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }
}
