package com.university.normaiser.repository;

import com.university.normaiser.model.Message; // import Message class
import org.springframework.data.jpa.repository.JpaRepository; // import Jpa repository
import org.springframework.stereotype.Repository; // import Repository annotation

import java.util.List; // import List interface

@Repository // persistence layer - database repository
// this interface defines a database repository that has Message class as entity and Integer value as ID
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByMtype(String type); // derived Query method, that finds messages according to needed type
}
