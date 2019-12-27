package com.stackroute.favouriteservice.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stackroute.favouriteservice.domain.Book;

public interface BookRepository extends JpaRepository<Book,Integer> {
	
	List<Book> findByUserId(String userId);
}