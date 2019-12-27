package com.stackroute.favouriteservice.controller;

import java.util.*;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.stackroute.favouriteservice.domain.Book;
import com.stackroute.favouriteservice.exception.BookAlreadyExistsException;
import com.stackroute.favouriteservice.exception.BookNotFoundException;
import com.stackroute.favouriteservice.service.BookService;

import io.jsonwebtoken.Jwts;

@CrossOrigin
@RestController
@RequestMapping("/api/bookservice")
public class BookController {
	
	@Autowired
	private BookService bookservice;
	
	//< - - Save Method - - >
	@PostMapping("/book")
	public ResponseEntity<?> saveNewMovie(@RequestBody Book book,
			HttpServletRequest request,HttpServletRequest response){
		System.out.println("Saving book");
		String authHeader=request.getHeader("authorization");
		String token=authHeader.substring(7);
		String userId=Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody().getSubject();
		System.out.println("userId: "+userId);		
		try{
			book.setUserId(userId);
			bookservice.saveBook(book);
		}
		catch(BookAlreadyExistsException e){
		return new ResponseEntity<String>(e.getMessage(),HttpStatus.CONFLICT);
		}
		catch(Exception e){
			return new ResponseEntity<String>("{\"message\": \""+e.getMessage()+"\"}",HttpStatus.INTERNAL_SERVER_ERROR);
			}
		return new ResponseEntity<Book>(book,HttpStatus.CREATED);
	}
	
	
	@DeleteMapping("/book/{id}")
	public ResponseEntity<?> deleteMovie(@PathVariable("id") int id){
		try{
			bookservice.deleteBookById(id);
		}
		catch(BookNotFoundException e){
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
		catch(Exception e){
			return new ResponseEntity<String>("{\"message\": \""+e.getMessage()+"\"}",HttpStatus.INTERNAL_SERVER_ERROR);
			}
		return new ResponseEntity<String>("Book deleted successfully",HttpStatus.OK);
	}
	
	
	@GetMapping("/book/{id}")
	public ResponseEntity<?> getBook(@PathVariable("id") int id){
		Book getbook;
		try{
			getbook=bookservice.getBookById(id);
		}
		catch(BookNotFoundException e){
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
		catch(Exception e){
			return new ResponseEntity<String>("{\"message\": \""+e.getMessage()+"\"}",HttpStatus.INTERNAL_SERVER_ERROR);
			}
		return new ResponseEntity<Book>(getbook, HttpStatus.OK);
	}
	
	
	@GetMapping("/books")
	public @ResponseBody ResponseEntity<List<Book>> getMyBooks(ServletRequest req, ServletResponse res){
		HttpServletRequest request=(HttpServletRequest) req;
		String authHeader=request.getHeader("authorization");
		String token=authHeader.substring(7);
		String userId=Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody().getSubject();
		return new ResponseEntity<List<Book>>(bookservice.getMyBooks(userId),HttpStatus.OK);
	}
	
}
