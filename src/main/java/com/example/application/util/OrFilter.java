package com.example.application.util;

import java.util.List;

public class OrFilter implements Filter {

    private List<Filter> children;

    public List<Filter> getChildren() {
        return children;
    }

    public void setChildren(List<Filter> children) {
        this.children = children;
    }
}
