package gestionCommerciale.controller;
import gestionCommerciale.convert.UserConvert;
import gestionCommerciale.dto.UserDto;
import gestionCommerciale.entity.User;
import gestionCommerciale.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;

    public UserController(UserService authService) {
        this.userService = authService;
    }

    
    @GetMapping("/get-all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (!users.isEmpty()) {
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    
    
    @GetMapping("/get-user")
    public ResponseEntity<UserDto> getUser(@RequestParam Integer id) {
        User user = userService.getUser(id);
        if (user != null) {
            return ResponseEntity.ok(UserConvert.toDto(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/save-user")
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) {
        UserDto savedUser = userService.saveUser(userDto);
        return ResponseEntity.ok(savedUser);
    }
    
    
    @GetMapping("/delete-user")
    public ResponseEntity<Void> delete(@RequestParam Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/update-user")
    public ResponseEntity<UserDto> update(@RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(userDto);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        Map<String, String> response = new HashMap<>();

        User authenticatedUser = userService.login(email, password);
        
        try  {
            
            response.put("uuid", authenticatedUser.getUuid());
            response.put("email", authenticatedUser.getEmail());
            response.put("role", authenticatedUser.getRole().toString());
            response.put("name", authenticatedUser.getName());
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            String errorMessage = ex.getMessage();
            response.put("error", errorMessage); // Include error message in response
            return ResponseEntity.ok(response); // Always return 200 OK
        }
    }
  

}
