package com.project.rookies.configs;

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
    //    private final ICustomerService customerService;
//    private final IBillOrderService billOrderService;
//    private final IOrderDetailService orderDetailService;
    private final IRoleService roleService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    CommandLineRunner run() {
        return args -> {
//            roleService.saveRole(new Role(1L, ERoleType.ROLE_ADMIN));
//            roleService.saveRole(new Role(2L, ERoleType.ROLE_USER));
//            roleService.saveRole(new Role(3L, ERoleType.ROLE_USER));
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
