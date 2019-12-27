package com.stackroute.favouriteservice.controllerTest;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.favouriteservice.controller.BookController;
import com.stackroute.favouriteservice.domain.Book;
import com.stackroute.favouriteservice.service.BookService;

@RunWith(SpringRunner.class)
@WebMvcTest(BookController.class)
public class BookControllerTest {
	
	@Autowired
	private MockMvc bookMockMvc;
	
	@MockBean
	private BookService bookservice;
	
	@InjectMocks
	private BookController bookController;
	
	private Book book;
	List<Book> books;
	
	@Before
	public void setUp()throws Exception{
		MockitoAnnotations.initMocks(this);
		books=new ArrayList<>();
		book=new Book(500,"GOT-1","RR Martin","96325874","JohnSnow");
		books.add(book);
        book=new Book(600,"GOT-2","RR Martin","98745216","JohnSnow");
        books.add(book);
		bookMockMvc=MockMvcBuilders.standaloneSetup(bookController).build();
		
	}
	

	
	@Test
	public void testSaveBook()throws Exception{
		String token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYSIsImlhdCI6MTU1MzA2OTcwNX0.PK-py6MXywTauPyHu-iG7BBN46E7O65JRA5bsVbsTzI";
		when(bookservice.saveBook(book)).thenReturn(true);
		bookMockMvc.perform(post("/api/bookservice/book").header("authorization","Bearer "+token).contentType(MediaType.APPLICATION_JSON).content(jsonToString(book))).andExpect(status().isCreated());
		verify(bookservice,times(1)).saveBook(Mockito.any(Book.class));
	}
	
	@Test
	public void testDeleteBookById() throws Exception {
		when(bookservice.deleteBookById(1)).thenReturn(true);
		bookMockMvc.perform(delete("/api/bookservice/book/{id}", 1)).andExpect(status().isOk());
		verify(bookservice, times(1)).deleteBookById(1);
		verifyNoMoreInteractions(bookservice);
	}
	
	@Test
	public void testGetBookById() throws Exception {
		String token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYSIsImlhdCI6MTU1MzA2OTcwNX0.PK-py6MXywTauPyHu-iG7BBN46E7O65JRA5bsVbsTzI";
		when(bookservice.getBookById(1)).thenReturn(book);
		bookMockMvc.perform(get("/api/bookservice/book/{id}", 1).header("autorization", "Bearer "+token).contentType(MediaType.APPLICATION_JSON).content(jsonToString(book))).andExpect(status().isOk());
		verify(bookservice, times(1)).getBookById(1);
		verifyNoMoreInteractions(bookservice);
	}

	@Test
	public void testGetAllBooks() throws Exception {
		List <Book> books=new ArrayList<>();
		Book book1=new Book(700, "HP-1","JK Rowling","65478932","Harry");
		books.add(book1);
		Book book2=new Book(800,"HP-2","JK Rowling","85214796","Harry");
		books.add(book2);
		String token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYSIsImlhdCI6MTU1MzA2OTcwNX0.PK-py6MXywTauPyHu-iG7BBN46E7O65JRA5bsVbsTzI";
		when(bookservice.getMyBooks("aa")).thenReturn(books);
		bookMockMvc.perform(get("/api/bookservice/books").header("authorization","Bearer "+token).contentType(MediaType.APPLICATION_JSON).content(jsonToString(book))).andExpect(status().isOk());
		verify(bookservice, times(1)).getMyBooks("aa");
		verifyNoMoreInteractions(bookservice);
	}



	private String jsonToString(final Object object) {
		try {
			return new ObjectMapper().writeValueAsString(object);
		} catch (Exception e) {
			throw new RuntimeException(e);
			}
	}
}
