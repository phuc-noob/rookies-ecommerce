package com.project.rookies.configs;

import com.project.rookies.entities.Admin;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.Role;
import com.project.rookies.entities.enums.ERoleType;
import com.project.rookies.repositories.AdminRepo;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.RoleRepo;
import com.project.rookies.services.inf.IRoleService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Connector;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootConfiguration
@RequiredArgsConstructor
public class AppConfig {
    private final CustomerRepo customerRepo;
    private final RoleRepo roleRepo;
    private final AdminRepo adminRepo;
    //private final ModelMapper modelMapper ;
//    private final IBillOrderService billOrderService;
//    private final IOrderDetailService orderDetailService;
    private final IRoleService roleService;

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    CommandLineRunner run() {
        return args -> {
            roleService.saveRole(new Role(1L, ERoleType.ROLE_ADMIN));
            roleService.saveRole(new Role(2L, ERoleType.ROLE_USER));
            Customer customer = new Customer(null,"a","a","b","a@gmail.com",null,null,null,"hello",null,null,null,null,null,null);
            customer.setPassword(passwordEncoder().encode(customer.getPassword()));
            customer.setRole(roleRepo.findByRoleName(ERoleType.ROLE_USER));
            customerRepo.save(customer);

            Admin admin = new Admin(null,"admin","00000000",null);
            admin.setPassword(passwordEncoder().encode(admin.getPassword()));
            admin.setRole(roleRepo.findByRoleName(ERoleType.ROLE_ADMIN));
            adminRepo.save(admin);
//            ///customerService.saveCustomer(new Customer(null,"a","a","a","b",null,null,"a",null,null,null,null ));
//            BillOrder billOrder = new BillOrder(null,null,true,1,null,null, null ,null);
//            billOrder.setCustomer(customer);
//            billOrderService.saveBillOrder(billOrder);
//
//            OrderDetail orderDetail =new OrderDetail(null,null,null,null,null,100,10,10);
//            orderDetailService.saveOrderDetail(orderDetail);
        };
    }

    @Bean
    public TomcatServletWebServerFactory containerFactory() {
        return new TomcatServletWebServerFactory() {
            @Override
            protected void customizeConnector(Connector connector) {
                super.customizeConnector(connector);
                connector.setParseBodyMethods("POST,PUT,DELETE");
            }
        };
    }
}
