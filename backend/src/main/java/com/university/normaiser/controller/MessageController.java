package com.university.normaiser.controller;

import com.university.normaiser.service.MessageService; // import messageService class
import org.springframework.beans.factory.annotation.Autowired; // import autowired annotation
import org.springframework.web.bind.annotation.*; // import RestController, RequestMapping and etc.

@RestController // RestController annotation - specifically for RESTful APIs.
@RequestMapping("/messages") // map web link to MessageController class

// class that is responsible for processing incoming REST API requests
public class MessageController {
    private MessageService messageService; // object of class messageService

    @Autowired // inject dependencies via constructor
    public MessageController(MessageService messageService) { // constructor
        this.messageService = messageService; // place instance of bean into the messageService
    }


    @GetMapping("/getByType") // map web link to this method
    @ResponseBody // this method sends a response back to frontend
    @CrossOrigin(origins = "http://localhost:3005") // enable cross-origin calls for this method
    public String getMessageByType(@RequestParam String type) { // get a random message, which has needed type
        return messageService.getMessageByType(type); // call the method of messageService
    }
}
