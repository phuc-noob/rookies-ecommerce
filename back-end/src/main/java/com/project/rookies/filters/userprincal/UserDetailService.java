package com.project.rookies.filters.userprincal;

import com.project.rookies.entities.Admin;
import com.project.rookies.entities.Customer;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.repositories.AdminRepo;
import com.project.rookies.repositories.CustomerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;

@Service
@Transactional
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {
    private final CustomerRepo customerRepo;
    private final AdminRepo adminRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // check : customer account
        if (customerRepo.findByEmail(username) != null) {
            Customer customer = customerRepo.findByEmail(username);
            return UserPrinciple.buildCustomer(customer);
        }
        // check : is admin account
        else if (adminRepo.findByAdminName(username) != null) {
            Admin admin = adminRepo.findByAdminName(username);
            return UserPrinciple.buildAdmin(admin);
        } else {
            throw new ResourceNotFoundException("account not found in the database");
        }
    }
}
