package com.project.rookies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class RookiesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RookiesApplication.class, args);
	}

}
