package com.project.rookies.services.impl;

import com.project.rookies.entities.BillOrder;
import com.project.rookies.repositories.BillOrderRepo;
import com.project.rookies.services.inf.IBillOrderService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class BillOrderServiceImpl implements IBillOrderService {
    private final BillOrderRepo billOrderRepo ;
    @Override
    public BillOrder saveBillOrder(BillOrder billOrder) {
        return billOrderRepo.save(billOrder);
    }
}
