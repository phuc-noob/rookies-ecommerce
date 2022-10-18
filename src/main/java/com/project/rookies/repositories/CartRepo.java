package com.project.rookies.repositories;

import com.project.rookies.dto.request.CartDetailDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.entities.Cart;
import com.project.rookies.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart,Long> {
    Boolean existsByCustomer(Customer customer);

}
