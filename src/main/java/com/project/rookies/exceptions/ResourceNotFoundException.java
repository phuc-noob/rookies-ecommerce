package com.project.rookies.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException(String message) {
        super(message);
    }


}
