package com.example.application.util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import com.example.application.endpoint.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import com.vaadin.exampledata.ExampleDataGenerator;

public class RepoInit {

    public static <T> void initIfNeeded(JpaRepository<T, ?> repo,
            Class<T> type) {
        Random random = new Random(System.currentTimeMillis());

        if (repo.count() == 0L) {
            ExampleDataGenerator<T> generator = new ExampleDataGenerator<>(type,
                    LocalDateTime.of(2022, 1, 2, 1, 2, 3));
            for (Method m : type.getMethods()) {
                ExampleData annotation = m.getAnnotation(ExampleData.class);
                if (annotation != null) {
                    generator.setData((instance, value) -> {
                        try {
                            if (annotation.value() == Type.SALARY) {
                                m.invoke(instance, ((Integer) value) * 100);
                                return;
                            }
                            m.invoke(instance, value);
                        } catch (IllegalAccessException
                                | IllegalArgumentException
                                | InvocationTargetException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }, annotation.value().getDataType());
                }
            }
            List<T> beans = generator.create(1000, 0);
            for (T bean : beans) {
                if (bean instanceof Person) {
                    ((Person) bean).setTaxesPaid(
                            new BigDecimal(random.nextDouble() * 100000.0));
                }

            }
            repo.saveAll(beans);
        }
    }

}
