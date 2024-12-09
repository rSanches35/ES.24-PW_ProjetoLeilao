package com.leilao.backend.model.dto;

import lombok.Data;

@Data
public class PersonChangePasswordDTO {
    
    private String email;
    private String password;

    public PersonChangePasswordDTO(String email, String password){

        this.email = email;
        this.password = password;
    }
}
