package com.university.normaiser.service;

import com.university.normaiser.model.Message;
import com.university.normaiser.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class MessageService{
    private MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public String getMessageByType(String type) {
        List<Message> messagesOfNecessaryType = messageRepository.findByType(type);
        int index = getRandomIndex(0, messagesOfNecessaryType.size());
        return messagesOfNecessaryType.get(index).getMessage();
    }

    // generate random integer number in range [min, max)
    private int getRandomIndex(int min, int max) {
        return ThreadLocalRandom.current().nextInt(min, max);
    }
}
