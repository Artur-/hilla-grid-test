package com.example.application.endpoints.helloreact;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class HelloReactEndpoint {

    @Nonnull
    public String sayHello(Person person) {
        return "foo";
    }
}
