package gestionCommerciale.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name ="clients")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	@Column(name="id")
	private Integer id;
	@JsonProperty("code")
	@Column(name="code")
	private Integer code;
	@JsonProperty("intutile")
	@Column(name="intutile")
	private String intutile;
	@JsonProperty("telephone")
	@Column(name="telephone")
	private String telephone;
	@Column(name="email")
	@JsonProperty("email")
	private String email;
	@JsonProperty("adresse")
	@Column(name="adresse")
	private String adresse;
	

}
