package com.project.rookies.configs;

import com.project.rookies.entities.enums.ERoleType;
import com.project.rookies.filters.jwt.JwtAuthorizationFilter;
import com.project.rookies.filters.jwt.JwtEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.Arrays;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@RestController
@CrossOrigin(value = "http://localhost:3000")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtEntryPoint jwtEntryPoint;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and();
        http.csrf().disable().exceptionHandling().authenticationEntryPoint(jwtEntryPoint).and();
        http.authorizeRequests().antMatchers("/api/auth/login", "/api/auth", "/api/auth/register").permitAll();

        // must have role Admin
        http.authorizeRequests()
                //.antMatchers(GET,"/api/customers").hasAnyAuthority(ERoleType.ROLE_ADMIN.toString())
                .antMatchers(POST, "/api/products", "/api/categories", "/api/voucher").hasAnyAuthority(ERoleType.ROLE_ADMIN.toString())
                .antMatchers(PUT, "/api/products").hasAnyAuthority(ERoleType.ROLE_ADMIN.toString())
                .antMatchers(DELETE, "/api/categories/**", "/api/products/**").hasAnyAuthority(ERoleType.ROLE_ADMIN.toString());

        // permitAll api
        http.authorizeRequests()
                .antMatchers(GET, "/api/categories/**", "/api/products/**", "/api/customers/**","/api/carts/**").permitAll();
        http.authorizeRequests()
                .antMatchers("/swagger-ui/*", "/v3/api-docs/**").permitAll()
                .antMatchers(POST, "/api/carts/**","/api/orders/**").permitAll()
                .antMatchers(PATCH,"/api/auth/**").permitAll();

        http.authorizeRequests().anyRequest().authenticated();
        http.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedOrigin("*");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
