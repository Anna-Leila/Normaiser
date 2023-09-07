package com.university.normaiser.service;

import com.university.normaiser.model.Messages;
import com.university.normaiser.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;


    public List<Messages> getAllMessages() {
        List<Messages> messageList = messageRepository.findAll();
        System.out.println(messageList);
        return messageList;
    }
}
