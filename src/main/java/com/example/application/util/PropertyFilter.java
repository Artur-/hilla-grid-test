package com.example.application.util;

import dev.hilla.Nonnull;

public class PropertyFilter implements Filter {
    public enum Type {
        EQUALS, CONTAINS, GREATER_THAN, GREATER_THAN_OR_EQUALS, LESS_THAN, LESS_THAN_OR_EQUALS,
    }

    private String propertyId;
    private String filterValue;
    @Nonnull
    private Type type;

    public String getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(String propertyId) {
        this.propertyId = propertyId;
    }

    public String getFilterValue() {
        return filterValue;
    }

    public void setFilterValue(String filterValue) {
        this.filterValue = filterValue;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
