package com.leilao.backend.model.dto;

import lombok.Data;

@Data
public class PersonChangePasswordDTO {
    
    private String email;
    private String validationCode;
    private String password;

    public PersonChangePasswordDTO(String email, String validationCode, String password){

        this.email = email;
        this.validationCode = validationCode;
        this.password = password;
    }
}
