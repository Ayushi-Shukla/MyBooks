package com.stackroute.userservice.serviceTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.Before;

import com.stackroute.userservice.domain.*;
import com.stackroute.userservice.exception.*;
import com.stackroute.userservice.repository.*;
import com.stackroute.userservice.service.*;

public class UserServiceTest {
	
	private User user;
	Optional<User> options;
	
	@Mock
	private UserRepository userRepository;
	
	@InjectMocks
	private UserService userService;
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		user=new User("HarryPotter","Harry","Potter","Magic",new Date());
		options=Optional.of(user);
	}
	
	@Test
	public void testSaveUserSuccess()throws UserNotFoundException,UserAlreadyExistsException{
		when(userRepository.save(user)).thenReturn(user);
		boolean flag =userService.saveUser(user);
		assertEquals("Register user",true, flag);
		verify(userRepository, times(1)).save(user);
	}
	
	@Test(expected=UserAlreadyExistsException.class)
	public void testSaveUserFail()throws UserNotFoundException,UserAlreadyExistsException{
		when(userRepository.findById(user.getUserId())).thenReturn(options);
		when(userRepository.save(user)).thenReturn(user);
		boolean flag =userService.saveUser(user);
	}
	
	@Test
	public void testValidateSuccess()throws UserNotFoundException{
		when(userRepository.findByUserIdAndPassword(user.getUserId(), user.getPassword())).thenReturn(user);
		User userResult=userService.findByUserIdAndPassword(user.getUserId(), user.getPassword());
		assertNotNull(userResult);
		assertEquals("HarryPotter",userResult.getUserId());
		verify(userRepository, times(1)).findByUserIdAndPassword(user.getUserId(), user.getPassword());
	}
}