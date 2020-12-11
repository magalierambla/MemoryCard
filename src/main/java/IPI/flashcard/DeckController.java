package IPI.flashcard;

import IPI.flashcard.user.UtilisateurRepository;
import IPI.flashcard.user.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/deck")
public class DeckController {

    @Autowired
    DeckRepository repo;

    @Autowired
    CardRepository repocard;

    @Autowired
    UtilisateurRepository users;

    //METHODE GET
    @RequestMapping("/{id}")
    @ResponseBody
    public Deck getDeck(@PathVariable("id") Integer id, @RequestHeader("login") String login,
                        @RequestHeader("password") String password){
        System.out.println(users.authentifierAdmin(login, Utils.encrypt(password)));
        if (users.authentifierAdmin(login, Utils.encrypt(password))!=null) {
            // Deck result = repo.findById(id).get();
            Deck result = repo.findByIdAndLogin(id, login);
            return result;
        }
        return null;
    }

    // METHODE GET ALL
    @RequestMapping("/all")
    @ResponseBody
    public Iterable<Deck> getDecks(@RequestHeader("login") String login,
                                   @RequestHeader("password") String password) {
        if (users.authentifierAdmin(login, Utils.encrypt(password))!=null) {
            return repo.findAllByLogin(login);
        }
        return null;
    }


    // METHODE POST
    @RequestMapping(value="",method = RequestMethod.POST)
    @ResponseBody
    public Deck postDeck(@RequestBody Deck d, @RequestHeader("login") String login,
                           @RequestHeader("password") String password) {
        if (users.authentifierAdmin(login, Utils.encrypt(password))!=null) {
            Deck dnew = new Deck();
            dnew.setNom(d.getNom());
            dnew.setLogin(login);
            dnew = repo.save(dnew);
            dnew.setCards(d.getCards());

            if (!(d.getCards() == null)) {
                List<Card> cartes = d.getCards();
                for (Card c : cartes){
                    c.setLogin(login);
                }
                dnew.setCards(d.getCards());
            }


            Deck result = repo.save(dnew);
            return result;
        }
        return null;
    }

    // METHODE PUT
    @RequestMapping(value="",method = RequestMethod.PUT)
    @ResponseBody
    public Deck putDeck(@RequestBody Deck d, @RequestHeader("login") String login,
                        @RequestHeader("password") String password) {
        if (users.authentifierAdmin(login, Utils.encrypt(password))!=null) {
            Iterable<Card> cartes = repocard.saveAll(d.getCards());
            List<Card> listes = new ArrayList<>();
            for (Card c : cartes){
                listes.add(c);
                c.setLogin(login);
            }

            // Deck toUpdate = repo.findById(d.getId()).get();
            Deck toUpdate = repo.findByIdAndLogin(d.getId(), login);
            toUpdate.setNom(d.getNom());
            toUpdate.setLogin(login);
            toUpdate.setCards(listes);
            repo.save(toUpdate);
            return toUpdate;
        }
        return null;
    }

    // METHODE DELETE
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Deck deleteDeck(@PathVariable("id") Integer id, @RequestHeader("login") String login,
                           @RequestHeader("password") String password) {
        if (users.authentifierAdmin(login, Utils.encrypt(password))!=null) {
            //d = repo.findById(id).get();
            Deck d = repo.findByIdAndLogin(id, login);
            repo.delete(d);
            return d;
        }
        return null;
    }

    // METHODE GET ALL CARDS
    @RequestMapping("/cards")
    @ResponseBody
    public Iterable<Card> getCards(@RequestHeader("login") String login,
                                   @RequestHeader("password") String password) {
        if (users.authentifierAdmin(login, Utils.encrypt(password))!=null) {
            return repocard.findAllByLogin(login);
        }
        return null;
    }

}
