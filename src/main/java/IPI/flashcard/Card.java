package IPI.flashcard;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Card {

    @Id
    @GeneratedValue
    private Integer id;
    private String nom;
    private String definition;
    private String image;

    private String login;

    public Card() {
    }

    public Card(Integer id, String nom, String definition, String image) {
        this.id = id;
        this.nom = nom;
        this.definition = definition;
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getDefinition() {
        return definition;
    }

    public String getImage() {
        return image;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
