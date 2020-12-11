package IPI.flashcard;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional
@Repository

public interface CardRepository extends CrudRepository<Card,Integer> {

    List<Card> findAllByLogin(String login);

}
