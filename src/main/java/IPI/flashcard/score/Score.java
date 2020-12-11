package IPI.flashcard.score;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Score {

    @Id
    @GeneratedValue
    private Integer id;
    private String resultat;
    private Integer deckId;
    private String login;
    private LocalDate date;


    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = LocalDate.now();
    }

    public Score() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Score(String resultat ) {
        this.resultat = resultat;
        this.deckId = deckId;
        this.login = login;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getResultat() {
        return resultat;
    }

    public void setResultat(String resultat) {
        this.resultat = resultat;
    }


    public Integer getDeckId() {
        return deckId;
    }

    public void setDeckId(Integer deckId) {
        this.deckId = deckId;
    }

}
