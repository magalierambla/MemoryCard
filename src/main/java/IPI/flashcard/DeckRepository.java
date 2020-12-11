package IPI.flashcard;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional
@Repository

public interface DeckRepository extends CrudRepository<Deck,Integer> {

    List<Deck> findAllByLogin(String login);

    Deck findByIdAndLogin(Integer id, String login);
}
