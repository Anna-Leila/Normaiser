package com.university.normaiser.service;

import com.university.normaiser.model.Message; // import Message class
import com.university.normaiser.repository.MessageRepository; // import MessageRepository interface
import org.springframework.beans.factory.annotation.Autowired; // import Autowired annotation
import org.springframework.stereotype.Service; // import Service annotation
import java.util.List; // import List interface
import java.util.concurrent.ThreadLocalRandom; // import class to generate random numbers in the current thread

@Service // this is a service class for implementation of application logic
public class MessageService {
    private MessageRepository messageRepository; // object of interface messageRepository

    @Autowired // inject dependencies via constructor
    public MessageService(MessageRepository messageRepository) { // constructor
        this.messageRepository = messageRepository; // place instance of bean into the messageRepository
    }

    // get random message out of all messages of needed type
    public String getMessageByType(String type) {
        List<Message> messagesOfNecessaryType = messageRepository.findByMtype(type); // get all messages of needed type
        int index = getRandomIndex(0, messagesOfNecessaryType.size()); // get random index
        return messagesOfNecessaryType.get(index).getMessage(); // return random message
    }


    // generate random integer number in range [min, max)
    private int getRandomIndex(int min, int max) {
        // get random number in range [min, max) out of the current thread
        return ThreadLocalRandom.current().nextInt(min, max);
    }
}
