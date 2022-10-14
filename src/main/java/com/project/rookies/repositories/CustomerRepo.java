package com.project.rookies.repositories;

import com.project.rookies.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CustomerRepo extends JpaRepository<Customer,Long> {
    Customer findByEmail(String email);
}
