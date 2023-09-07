package com.university.normaiser.controller;

import com.university.normaiser.model.Messages;
import com.university.normaiser.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/message")
@CrossOrigin
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/getAll")
    public List<Messages> getMessages() {
        return messageService.getAllMessages();
    }
}
