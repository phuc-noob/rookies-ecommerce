package com.project.rookies.configs;

import com.project.rookies.entities.BillOrder;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.OrderDetail;
import com.project.rookies.services.inf.IBillOrderService;
import com.project.rookies.services.inf.ICustomerService;
import com.project.rookies.services.inf.IOrderDetailService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootConfiguration
public class AppConfig {
//    private final ICustomerService customerService;
//    private final IBillOrderService billOrderService;
//    private final IOrderDetailService orderDetailService;
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public ModelMapper modelMapper()
    {
        return new ModelMapper();
    }
    @Bean
    CommandLineRunner run( ){
        return args -> {
//            Customer customer = new Customer(null,"a","a","b","c",null,null,"a",null,null,null,null );
//            customerService.saveCustomer(customer);
//            ///customerService.saveCustomer(new Customer(null,"a","a","a","b",null,null,"a",null,null,null,null ));
//            BillOrder billOrder = new BillOrder(null,null,true,1,null,null, null ,null);
//            billOrder.setCustomer(customer);
//            billOrderService.saveBillOrder(billOrder);
//
//            OrderDetail orderDetail =new OrderDetail(null,null,null,null,null,100,10,10);
//            orderDetailService.saveOrderDetail(orderDetail);
        };
    }


}
