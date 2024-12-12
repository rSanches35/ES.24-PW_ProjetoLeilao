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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.sql.Date;
import java.time.LocalDateTime;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled"})
@Data @Entity @Table(name = "auction")
public class Auction {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private Long idAuction;

    @NotBlank(message =  "Title is Required")
    private String title;

    private String description;

    @Column(name = "start_date_time") @NotNull(message = "End Date Time is Required")
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time") @NotNull(message = "End Date Time is Required")
    private LocalDateTime endDateTime;

    private String status;

    private String observation;

    @Column(name = "increment_value") @NotNull(message = "Increment Value is Required")
    private Double incrementValue;

    @Column(name = "minimum_bid") @NotNull(message = "Minimum Bid is Required")
    private Double minimumBid;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;

    @OneToMany(mappedBy = "auction", orphanRemoval = true, cascade = CascadeType.ALL)
    @Setter(value = AccessLevel.NONE)
    private List<AuctionCategory> auctionCategory;

    /*
@   Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return personProfile.stream().map(userRole -> new SimpleGrantedAuthority(userRole.getProfile().getName())).collect(Collectors.toList());
    }
    */
}
