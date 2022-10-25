package com.project.rookies.repositories;

import com.project.rookies.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherRepo extends JpaRepository<Voucher, Long> {
}
