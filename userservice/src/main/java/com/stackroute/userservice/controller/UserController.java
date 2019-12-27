package com.stackroute.userservice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.service.SecurityTokenGenerator;
import com.stackroute.userservice.service.UserService;



@CrossOrigin
@RestController
@RequestMapping("api/userservice")
public class UserController {
	
	@Autowired
	private UserService userservice;
	
	@Autowired
	private SecurityTokenGenerator tokenGenerator;
	
	@PostMapping("/register")
	public ResponseEntity<?>registerUser(@RequestBody User user){
		try{
			
			userservice.saveUser(user);
		return new ResponseEntity<String>("User registered successfully",HttpStatus.CREATED);
		}
		catch(UserAlreadyExistsException e){
		return new ResponseEntity<String>("{\"message\": \""+e.getMessage()+"\"}",HttpStatus.CONFLICT);
		}
		catch(Exception e){
		return new ResponseEntity<String>("{\"message\": \""+e.getMessage()+"\"}",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?>loginUser(@RequestBody User logindetail){
		try{
			String userId=logindetail.getUserId();
			String password=logindetail.getPassword();
			if (userId==null || password==null){
				throw new Exception("Username or password cannot be empty");
			}
			User user=userservice.findByUserIdAndPassword(userId, password);
			if (user==null){
				throw new Exception("User with given Id does not exist");
			}
			String pwd=user.getPassword();
			if (!password.equals(pwd)){
				throw new Exception("Invalid login credential,Please check username and password");
			}
			Map<String,String> map=tokenGenerator.generateToken(user);
			return new ResponseEntity<Map<String,String>>(map,HttpStatus.OK);
		}
		catch(UserNotFoundException e){
			return new ResponseEntity<String>("{\"message\": \""+e.getMessage()+"\"}",HttpStatus.CONFLICT);
			}
		catch(Exception e){
		return new ResponseEntity<String>("{\"message\": \""+e.getMessage()+"\"}",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
