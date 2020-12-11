package IPI.flashcard;

import javax.persistence.*;
import java.util.List;

@Entity
public class Deck {

    @Id
    @GeneratedValue
    private Integer id;
    private String login;
    private String nom;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH})
    private List<Card> cards;

    public Deck() {
    }

    public Deck(Integer id, String nom, List<Card> cards) {
        this.id = id;
        this.nom = nom;
        this.cards = cards;
    }

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
