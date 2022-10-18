package com.project.rookies.repositories;

import com.project.rookies.entities.Customer;
import com.project.rookies.entities.enums.ECustomerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface CustomerRepo extends JpaRepository<Customer,Long> {
    Customer findByEmail(String email);
    @Query(value = "select * from customer c  offset :page limit :size ",nativeQuery = true)
    List<Customer> findListCustomer(int page, int size);
    @Modifying
    @Query(value = "update customer set status = :status where id = :id",nativeQuery = true)
    int updateCustomerStatus(@Param("status") ECustomerStatus status, @Param("id") Long id);
}
