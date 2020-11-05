package com.maciekbulanda.tasker.dto;


import com.maciekbulanda.tasker.documents.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private String id;
    private String username;
    private String password;
    private boolean enabled;
    private Set<String> authorities;
//    private Set<String> groups;

    public static UserDTO withNoPass(UserDTO userDTO) {
        return new UserDTO(userDTO.getId(),
                userDTO.getUsername(),
                "",
                userDTO.isEnabled(),
                userDTO.getAuthorities());
    }

    public User toUser() {
        return new User(this.id,
                this.username,
                this.password,
                this.enabled,
                this.authorities);
    }
}
