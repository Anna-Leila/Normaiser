package com.university.normaiser;

import org.springframework.boot.SpringApplication; // import class to bootstrap and launch Spring app
import org.springframework.boot.autoconfigure.SpringBootApplication; // import SpringBootApplication annotation

@SpringBootApplication // annotation to mark the configuration class
public class NormaiserApplication { // configuration class itself

	public static void main(String[] args) { // starting application point
		SpringApplication.run(NormaiserApplication.class, args); // run application
	}

}
