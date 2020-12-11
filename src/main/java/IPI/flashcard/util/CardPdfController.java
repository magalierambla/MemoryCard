package IPI.flashcard.util;
import IPI.flashcard.Card;
import IPI.flashcard.CardRepository;
import IPI.flashcard.Deck;
import IPI.flashcard.DeckRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/pdf")
public class CardPdfController {
    @Autowired
    CardRepository cardRepository;

    @Autowired
    DeckRepository deckRepo;

    Integer id = 1;

   /* @GetMapping(value = "/cards",
            produces = MediaType.APPLICATION_PDF_VALUE)*/
   @RequestMapping("/{id}")
   @ResponseBody
    public ResponseEntity<InputStreamResource> cardsReport(@PathVariable("id") Integer id) throws IOException {
        //List<Card> cards = (List<Card>) cardRepository.findAll();
         Deck deck =  deckRepo.findById(id).orElse(new Deck());
         List <Card> cards =  deck.getCards();

        System.out.println("log" + cards);

        ByteArrayInputStream bis = PdfGenerator.cardPDFReport(cards);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=cards.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}