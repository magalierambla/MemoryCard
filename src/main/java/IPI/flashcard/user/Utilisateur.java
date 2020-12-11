package IPI.flashcard.user;

import IPI.flashcard.Deck;

import javax.persistence.*;
import java.util.List;

@Entity
public class Utilisateur {

    @Id
    @Column(columnDefinition = "VARCHAR(100)")
    private String login;
    private String password;
    private String nom;
    private String prenom;

    @Column(unique = true,columnDefinition = "VARCHAR(100)")
    private String mail;
    private String role;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Deck> deck;


    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
