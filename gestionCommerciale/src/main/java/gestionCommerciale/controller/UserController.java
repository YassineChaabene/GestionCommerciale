package gestionCommerciale.controller;
import gestionCommerciale.entity.User;
import gestionCommerciale.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;

    public UserController(UserService authService) {
        this.userService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        User authenticatedUser = userService.login(email, password);
        Map<String, Object> response = new HashMap<>();

        if (authenticatedUser != null) {
            response.put("uuid", authenticatedUser.getUuid());
            response.put("email", authenticatedUser.getEmail());
          
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid credentials!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
