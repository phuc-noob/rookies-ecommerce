package com.project.rookies.exceptions;

import org.springframework.http.HttpStatus;

public class ValidationException extends RuntimeException {
    private static final long serialVersionUID = -3808246479819405631L;

    public ValidationException(String message) {
        super(message);
    }

}
