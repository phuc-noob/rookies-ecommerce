package com.project.rookies.filters.userprincal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.rookies.entities.Admin;
import com.project.rookies.entities.Customer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Slf4j
public class UserPrinciple implements UserDetails {
    private Long id;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;
    @JsonIgnore
    private String password;

    public UserPrinciple(Long id, String username, Collection<? extends GrantedAuthority> authorities, String password) {
        this.id = id;
        this.username = username;
        this.authorities = authorities;
        this.password = password;
    }

    public static UserPrinciple buildCustomer(Customer customer) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(customer.getRole().getRoleName().name()));

        return new UserPrinciple(
                customer.getCustomerId(),
                customer.getEmail(),authorities, customer.getPassword()
        );
    }

    public static UserPrinciple buildAdmin(Admin admin) {
        List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(admin.getRole().getRoleName().name()));
        return new UserPrinciple(
                admin.getAdminId(),
                admin.getAdminName(),authorities,
                admin.getPassword()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserPrinciple user = (UserPrinciple) o;
        return Objects.equals(id, user.id);
    }
}
