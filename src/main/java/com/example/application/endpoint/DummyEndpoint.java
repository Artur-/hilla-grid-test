package com.example.application.endpoint;

import com.example.application.util.AndFilter;
import com.example.application.util.OrFilter;
import com.example.application.util.PropertyFilter;
import dev.hilla.Endpoint;
import dev.hilla.mappedtypes.Pageable;

@Endpoint
public class DummyEndpoint {

    public void dummy(PropertyFilter f, OrFilter o, AndFilter a, Person p, Pageable pl) {

    }
}
