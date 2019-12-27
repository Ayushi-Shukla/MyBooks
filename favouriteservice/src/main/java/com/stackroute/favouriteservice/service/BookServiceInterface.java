package com.stackroute.favouriteservice.service;

import java.util.*;

import com.stackroute.favouriteservice.domain.*;
import com.stackroute.favouriteservice.exception.*;

public interface BookServiceInterface {
	
	boolean saveBook(Book Book) throws BookAlreadyExistsException;
	
	boolean deleteBookById(int id) throws BookNotFoundException;
	
	Book getBookById(int id) throws BookNotFoundException;
	
	List<Book> getMyBooks(String userId);
}
