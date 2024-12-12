package com.leilao.backend.model.dto;

import lombok.Data;

@Data
public class PersonVerifyCodeDTO {

    private String email;
    private String code;

    public PersonVerifyCodeDTO(String email, String code) {

        this.email = email;
        this.code = code;
    }
}
