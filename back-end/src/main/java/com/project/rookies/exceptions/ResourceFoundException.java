package com.project.rookies.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ResourceFoundException(String message) {
        super(message);
    }

}
