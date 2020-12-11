package IPI.flashcard.score;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface ScoreRepository extends CrudRepository<Score, Integer> {
}
