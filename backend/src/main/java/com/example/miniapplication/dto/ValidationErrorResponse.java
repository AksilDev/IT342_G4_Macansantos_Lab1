package com.example.miniapplication.dto;

import java.util.List;
import java.util.Map;

public class ValidationErrorResponse {
    private String message;
    private Map<String, List<String>> errors;
    private long timestamp;

    public ValidationErrorResponse() {
        this.timestamp = System.currentTimeMillis();
    }

    public ValidationErrorResponse(String message, Map<String, List<String>> errors) {
        this();
        this.message = message;
        this.errors = errors;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, List<String>> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, List<String>> errors) {
        this.errors = errors;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}