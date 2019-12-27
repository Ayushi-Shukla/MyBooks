package com.stackroute.favouriteservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.stackroute.favouriteservice.domain.*;
import com.stackroute.favouriteservice.exception.*;
import com.stackroute.favouriteservice.repository.BookRepository;

@Service
public class BookService implements BookServiceInterface {
	
	@Autowired
	private BookRepository bookrepository;

	@Override
	public boolean saveBook(Book book) throws BookAlreadyExistsException {
		Optional<Book> obj=bookrepository.findById(book.getId());
		if(obj.isPresent()){
		throw new BookAlreadyExistsException("Book aready exists, cannot be saved");
		}
		bookrepository.save(book);
		return true;
	}

	@Override
	public boolean deleteBookById(int id) throws BookNotFoundException {
		Book obj = bookrepository.findById(id).orElse(null);
		if (obj==null){
			throw new BookNotFoundException("Book not found, cannot be deleted.");
		}
		bookrepository.delete(obj);
		return true;
	}

	@Override
	public Book getBookById(int id) throws BookNotFoundException {
		Book obj=bookrepository.findById(id).get();
		if(obj==null){
			throw new BookNotFoundException("Book not found");
		}
		return obj;
	}

	@Override
	public List<Book> getMyBooks(String userId) {
		return bookrepository.findByUserId(userId);
	}

}
