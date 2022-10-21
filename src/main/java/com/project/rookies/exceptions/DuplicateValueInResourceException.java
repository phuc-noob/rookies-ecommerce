package com.project.rookies.exceptions;

import org.springframework.http.HttpStatus;

public class DuplicateValueInResourceException extends RuntimeException {
    public DuplicateValueInResourceException(String message) {
        super(message);
    }

}
