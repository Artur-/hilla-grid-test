package com.example.application.util;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "t")
@JsonSubTypes({ @Type(value = OrFilter.class, name = "or"),
        @Type(value = AndFilter.class, name = "and"),
        @Type(value = PropertyFilter.class, name = "prop") })
public interface Filter {

}
