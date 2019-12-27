package com.stackroute.favouriteservice.domain;

import javax.persistence.*;

@Entity
@Table(name="Book")
public class Book {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="title")
	private String title;
	
	@Column(name = "author_name")
	private String author_name;
	
	@Column(name = "isbn")
	private String isbn;
	
	@Column(name="user_id")
	private String userId;

	public Book() {
		super();
	}

	public Book(int id, String title, String author_name, String isbn,  String userId) {
		super();
		this.id = id;
		this.title = title;
		this.author_name = author_name;
		this.isbn = isbn;
		this.userId = userId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor_name() {
		return author_name;
	}

	public void setAuthor_name(String author_name) {
		this.author_name = author_name;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}