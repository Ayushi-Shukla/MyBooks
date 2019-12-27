package com.stackroute.favouriteservice.exception;

@SuppressWarnings("serial")
public class BookAlreadyExistsException extends Exception {

	public BookAlreadyExistsException(String message) {
		super(message);
	}

}
