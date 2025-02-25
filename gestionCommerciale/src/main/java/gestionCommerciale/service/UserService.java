package gestionCommerciale.service;

import gestionCommerciale.entity.User;
import gestionCommerciale.repository.UserRepo;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepo userRepository;

    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public User login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            return userOptional.get(); // Return the user object with UUID
        }
        return null; // Authentication failed
    }
}