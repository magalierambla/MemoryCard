package IPI.flashcard.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RestController
@RequestMapping("/utilisateur")
public class UtilisateurController {

    @Autowired
    UtilisateurRepository repo;

    //METHOD GET ALL (returns ALL users in the database)
    @RequestMapping("/all")
    @ResponseBody
    public Iterable<Utilisateur> donneUtilisateurs(@RequestHeader("login") String login,
                                                   @RequestHeader("password") String password) {

        if (repo.authentifierAdmin(login, Utils.encrypt(password))!=null) {
            ArrayList<Utilisateur> utilisateurs = new ArrayList<Utilisateur>();
            for (Utilisateur u : repo.findAll()){
                Utilisateur u2 = new Utilisateur();
                u2.setLogin(u.getLogin());
                u2.setMail(u.getMail());
                u2.setNom(u.getNom());
                u2.setPrenom(u.getPrenom());
                utilisateurs.add(u2);
            }
            return utilisateurs;
        }
        return null;

    }

    //METHOD GET (only returns ONE specific user)
    @RequestMapping("/{login}")
    @ResponseBody
    public Utilisateur getUtilisateur(@PathVariable("login") String login){
        Utilisateur result = repo.findById(login).get();
        return result;
    }

    //METHOD POST (to create a user)
    @RequestMapping(value = "create", method = RequestMethod.POST)
    @ResponseBody
    public Utilisateur creer(@RequestBody Utilisateur u){
        u.setPassword(Utils.encrypt(u.getPassword()));
        return repo.save(u);
    }

    //METHOD PUT (to modify the info of an existing user)
    @RequestMapping(value="", method = RequestMethod.PUT)
    @ResponseBody
    public Utilisateur putUtilisateur(@RequestBody Utilisateur u){
        Utilisateur uToUpdate = repo.findById(u.getLogin()).get();
        uToUpdate.setNom(u.getNom());
        uToUpdate.setPrenom(u.getPrenom());
        uToUpdate.setMail(u.getMail());
        uToUpdate.setPassword(u.getPassword());
        uToUpdate.setLogin(u.getLogin());
        uToUpdate.setRole(u.getRole());
        repo.save(uToUpdate);
        return uToUpdate;
    }

    //METHOD DELETE  (to delete an existing user)
    @RequestMapping(value = "{login}", method = RequestMethod.DELETE)
    @ResponseBody
    public String supprimer(@PathVariable("login") String login){
        repo.deleteById(login);
        return "User Deleted Successfully";
    }
}

