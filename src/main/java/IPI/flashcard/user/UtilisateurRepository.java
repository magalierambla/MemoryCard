package IPI.flashcard.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UtilisateurRepository extends CrudRepository<Utilisateur,String> {

    @Query("SELECT u FROM Utilisateur u WHERE login=?1 AND password=?2")
    public Utilisateur authentifier(String login, String pass);

    @Query("SELECT u FROM Utilisateur u WHERE login=?1 AND password=?2 AND role='admin'")
    public Utilisateur authentifierAdmin(String login, String password);
}