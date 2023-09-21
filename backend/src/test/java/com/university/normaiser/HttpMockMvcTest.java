package com.university.normaiser;


import static org.hamcrest.Matchers.containsStringIgnoringCase;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


@RunWith(SpringRunner.class) // use Spring's testing support
@AutoConfigureMockMvc // enables auto configuration
@SpringBootTest // start up application context
public class HttpMockMvcTest { // test http requests using MockMvc Spring framework

    @Autowired // inject dependencies
    private MockMvc mockMvc; // create MockMvc instance

    // test that for needed type the program returns a valid string
    public void testType(String type, String checkStr) throws Exception {
        // check if http link request returns a string wich contains a check string inside
        this.mockMvc.perform(get("/messages/getByType").param("type", type)).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsStringIgnoringCase(checkStr)));
        System.out.println("Test passed"); // print conformation message
    }

    @Test // test method
    public void testTypes() throws Exception { // check different types of requests
        testType("Out of bounds", "out of permitted bounds");
        testType("Not end of the line", "end of the line");
        testType("Success", "success");
    }
}