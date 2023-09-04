package com.example.application.util;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

public class FilterUtil {

    public static Specification<?> toSpec(Filter filter) {
        // Specification<T> spec = null;
        if (filter instanceof AndFilter andFilter) {
            return Specification.allOf(andFilter.getChildren().stream()
                    .map(FilterUtil::toSpec).toList());
        } else if (filter instanceof OrFilter orFilter) {
            return Specification.anyOf(orFilter.getChildren().stream()
                    .map(FilterUtil::toSpec).toList());
        } else if (filter instanceof PropertyFilter f) {
            return new Specification<Object>() {

                @Override
                public Predicate toPredicate(Root<Object> root,
                        CriteriaQuery<?> query,
                        CriteriaBuilder criteriaBuilder) {
                    return criteriaBuilder.like(
                            criteriaBuilder.lower(root.get(f.getPropertyId())),
                            "%" + f.getFilterValue().toLowerCase() + "%");
                }
            };
        } else {
            if (filter != null) {
                System.err.println(
                        "Unknown filter type: " + filter.getClass().getName());
            }
            return Specification.anyOf();
        }
    }
}
