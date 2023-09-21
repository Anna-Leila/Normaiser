package com.university.normaiser;

import static org.assertj.core.api.Assertions.assertThat;

import com.university.normaiser.controller.MessageController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest // creates ApplicationContext
public class SmokeTest { // verification testing class
    @Autowired
    private MessageController controller; // inject controller

    @Test
    public void contextLoads() throws Exception { // test that context loads and creates controller
        assertThat(controller).isNotNull(); // assert that controller exists
    }
}
