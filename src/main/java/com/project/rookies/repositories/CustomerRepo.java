package com.project.rookies.repositories;

import com.project.rookies.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CustomerRepo extends JpaRepository<Customer,Long> {
}
