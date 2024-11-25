package com.leilao.backend.repository;

import java.util.Optional;
import com.leilao.backend.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByEmail(String email);
    Optional<Person> findByValidationCode(String validationCode);
}