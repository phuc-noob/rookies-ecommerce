package com.project.rookies.repositories;

import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.entities.Cart;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long>, JpaSpecificationExecutor<Cart> {
    Boolean existsByCustomer(Customer customer);
    @Query(value = "select sum(c.amount) from cart c where customer_id = :customer_id group by customer_id",nativeQuery = true)
    Integer getQuantityCart(@Param("customer_id") Long customerId);
    List<Cart> findAllByCustomer(Customer customer);
    Cart findByProductAndCustomer(Product product,Customer customer);
    @Query(value = "select case when count(c) > 0 then true else false end from cart c "+
            "where customer_id  = :customerId and product_id = :productId", nativeQuery = true)
    boolean isExistCart(@Param("customerId") Long customerId, @Param("productId") Long productId);
}
