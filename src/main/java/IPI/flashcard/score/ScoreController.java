package IPI.flashcard.score;

import IPI.flashcard.user.UtilisateurRepository;
import IPI.flashcard.user.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/scores")
public class ScoreController {

    @Autowired
    ScoreRepository scoreRepository;

    @Autowired
    UtilisateurRepository userRepository;

    // METHODE GET ALL

    @RequestMapping("/all")
    @ResponseBody
    public Iterable<Score> getScores(
                                       /* @RequestHeader("login") String login,
                                     @RequestHeader("password") String password*/
    ) {
        return scoreRepository.findAll();
    }

    // METHODE POST
    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseBody
    public Score postScore(@RequestBody Score s,
                           @RequestHeader("deckId") Integer deckId,
                           @RequestHeader("login") String login

    ) {
        Score score = new Score();
        score.setResultat(s.getResultat());
        score.setDate(s.getDate());
        score.setDeckId(deckId);
        score.setLogin(login);
        Score result = scoreRepository.save(score);
        return result;
    }

}
