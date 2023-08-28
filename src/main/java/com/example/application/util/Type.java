package com.example.application.util;

import com.vaadin.exampledata.DataType;

public enum Type {
    FIRST_NAME(DataType.FIRST_NAME), //
    LAST_NAME(DataType.LAST_NAME), //
    EMAIL(DataType.EMAIL), //
    DATE_OF_BIRTH(DataType.DATE_OF_BIRTH);

    private DataType<?> dataType;

    private Type(DataType<?> dataType) {
        this.dataType = dataType;
    }

    public DataType<?> getDataType() {
        return dataType;
    }
}
