package com.stackroute.favouriteservice.serviceTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.stackroute.favouriteservice.domain.Book;
import com.stackroute.favouriteservice.exception.BookAlreadyExistsException;
import com.stackroute.favouriteservice.exception.BookNotFoundException;
import com.stackroute.favouriteservice.repository.BookRepository;
import com.stackroute.favouriteservice.service.BookService;


public class BookServiceTest {
	
	private Book book;
	Optional<Book> options;
	
	@Mock
	private BookRepository bookRepo;
	
	@InjectMocks
	private BookService bookService;
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		book=new Book(500,"GOT-1","RR Martin","96325874","JohnSnow");
		options=Optional.of(book);
	}
	
	@Test
	public void testMockCreation(){
		assertNotNull(book);
		assertNotNull("jpa repository creation fails: use@injectMocks on movieService",bookRepo);
	}
	
	@Test
	public void testSaveBookSuccess()throws BookAlreadyExistsException{
		when(bookRepo.save(book)).thenReturn(book);
		boolean flag =bookService.saveBook(book);
		assertEquals("saving book",true,flag);
		verify(bookRepo, times(1)).save(book);
		verify(bookRepo, times(1)).findById(book.getId());
	}
	
	@Test(expected=BookAlreadyExistsException.class)
	public void testSaveBookFail()throws BookAlreadyExistsException{
		when(bookRepo.findById(500)).thenReturn(options);
		when(bookRepo.save(book)).thenReturn(book);
		boolean flag =bookService.saveBook(book);
	}

	@Test
	public void testDeleteById() throws BookNotFoundException{
		when(bookRepo.findById(500)).thenReturn(options);
		doNothing().when(bookRepo).delete(book);
		boolean flag=bookService.deleteBookById(500);
		assertEquals("Deleting book", true, flag);
		verify(bookRepo,times(1)).findById(book.getId());
	}
	
	@Test
	public void testGetBookById()throws BookNotFoundException{
		when(bookRepo.findById(500)).thenReturn(options);
		Book book1=bookService.getBookById(500);
		assertEquals("fetching book",book1,book);
		verify(bookRepo,times(1)).findById(book.getId());
	}
	
	@Test
	public void testGetMyMovies(){
		List<Book> bookList=new ArrayList<>();
		bookList.add(book);
		when(bookRepo.findByUserId("aa")).thenReturn(bookList);
		List<Book> book1=bookService.getMyBooks("aa");
		assertEquals(bookList,book1);
		verify(bookRepo,times(1)).findByUserId("aa");
	}
	
}
