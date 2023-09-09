package com.university.normaiser.controller;

import com.university.normaiser.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController // use of @RestController which specifically designed for RESTful APIs.
@RequestMapping("/messages") // map web link to MessageController class

// class that is responsible for processing incoming REST API requests
public class MessageController {
    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }


    @GetMapping("/getByType")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3005") // enable cross-origin calls for this method
    public String getMessageByType(@RequestParam String type) {
        return messageService.getMessageByType(type);
    }
}
