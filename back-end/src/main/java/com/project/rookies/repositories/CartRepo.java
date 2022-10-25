package com.project.rookies.repositories;

import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.entities.Cart;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    Boolean existsByCustomer(Customer customer);

    List<Cart> findAllByCustomer(Customer customer);

    @Query(value = "select case when count(c) > 0 then true else false end from cart c "+
            "where customer_id  = :customerId and product_id = :productId", nativeQuery = true)
    boolean isExistCart(@Param("customerId") Long customerId, @Param("productId") Long productId);
}
