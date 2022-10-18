package com.project.rookies.exceptions;

import org.springframework.http.HttpStatus;

public class DuplicateValueInResourceException extends RuntimeException {
    public DuplicateValueInResourceException(String message, HttpStatus notModified) {
        super(message);
    }

    public DuplicateValueInResourceException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateValueInResourceException(Throwable cause) {
        super(cause);
    }
}
