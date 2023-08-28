package com.example.application.util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vaadin.exampledata.ExampleDataGenerator;

public class RepoInit {

    public static <T> void initIfNeeded(JpaRepository<T, ?> repo,
            Class<T> type) {
        if (repo.count() == 0L) {
            ExampleDataGenerator<T> generator = new ExampleDataGenerator<>(type,
                    LocalDateTime.of(2022, 1, 2, 1, 2, 3));
            for (Method m : type.getMethods()) {
                ExampleData annotation = m.getAnnotation(ExampleData.class);
                if (annotation != null) {
                    generator.setData((instance, value) -> {
                        try {
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
            repo.saveAll(generator.create(100, 0));
        }
    }

}
