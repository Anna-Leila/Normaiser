package com.university.normaiser.model;

import jakarta.persistence.*; // import Entity, Table etc.
import lombok.Data; // import Data annotation


@Entity // current class is an entity - persistence object to be linked with database
@Data // this annotation generates getters, setters, toString and others without any "vanilla" java code
@Table(name = "messages") // link this class to database table with name "messages"

// class that holds data of the table with messages
public class Message {
    @Id // id column in the table
    // strategy of new ids' generation for adding lines to database - in this implementation is NOT used
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column // this attribute corresponds to a column in the database table
    private int id; // id attribute

    @Column // this attribute corresponds to a column in the database table
    private String message; // message attribute

    @Column // this attribute corresponds to a column in the database table
    private String type; // type attribute

}
