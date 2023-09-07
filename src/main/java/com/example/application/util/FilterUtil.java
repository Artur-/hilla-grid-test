package com.example.application.util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class FilterUtil {

    @Autowired
    private EntityManager em;

    public <T> Specification<T> toSpec(Filter filter, Class<T> entity) {
        // Specification<T> spec = null;
        if (filter instanceof AndFilter andFilter) {
            return Specification.allOf(andFilter.getChildren().stream()
                    .map(f -> toSpec(f, entity)).toList());
        } else if (filter instanceof OrFilter orFilter) {
            return Specification.anyOf(orFilter.getChildren().stream()
                    .map(f -> toSpec(f, entity)).toList());
        } else if (filter instanceof PropertyFilter f) {
            String value = f.getFilterValue();
            Class<?> javaType = em.getMetamodel().entity(entity)
                    .getAttribute(f.getPropertyId()).getJavaType();
            return new Specification<T>() {
                @Override
                public Predicate toPredicate(Root<T> root,
                        CriteriaQuery<?> query,
                        CriteriaBuilder criteriaBuilder) {
                    Path<String> propertyPath = root.get(f.getPropertyId());
                    if (javaType == String.class) {
                        Expression<String> expr = criteriaBuilder
                                .lower(propertyPath);
                        return criteriaBuilder.like(expr,
                                "%" + value.toLowerCase() + "%");
                    } else if (javaType == LocalDate.class) {
                        TemporalAccessor date = DateTimeFormatter.ISO_DATE
                                .parse(value);
                        return criteriaBuilder.equal(propertyPath,
                                LocalDate.from(date));
                    } else {
                        return criteriaBuilder.equal(propertyPath,
                                value.toLowerCase());
                    }
                }
            };
        } else

        {
            if (filter != null) {
                System.err.println(
                        "Unknown filter type: " + filter.getClass().getName());
            }
            return Specification.anyOf();
        }
    }
}
