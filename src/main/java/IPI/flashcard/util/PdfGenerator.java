package IPI.flashcard.util;
import IPI.flashcard.Card;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfDocument;
import com.itextpdf.text.pdf.PdfWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

public class PdfGenerator {
    private static Logger logger = LoggerFactory.getLogger(PdfGenerator.class);

    public static ByteArrayInputStream cardPDFReport(List<Card> cards) {

//Etape 1 CREER UN DOCUMENT
        Document document = new Document(PageSize.A4_LANDSCAPE);

        //Document document = new Document(new Rectangle(PageSize.A4_LANDSCAPE));

        //Document document = new Document(PageSize.A4_LANDSCAPE);
        //Rectangle rect = new Rectangle(PageSize.A4_LANDSCAPE);
        //rect.setBorder(Rectangle.BOX);
        //rect.setBorderWidth(2);
        //document.setMargins(36, 72, 180, 180);
        //document.setMarginMirroring(true) ;


        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            //PdfWriter.getInstance(document, out);
            //document.open();

            //document.setPageSize(PageSize.POSTCARD);
            // Add Text to PDF file ->
            //Font font = FontFactory.getFont(FontFactory.COURIER, 14, BaseColor.BLACK);
            //Paragraph para = new Paragraph( "Card Table", font);
            //para.setAlignment(Element.ALIGN_CENTER);
            //document.add(para);
            //document.add(Chunk.NEWLINE);

//ETAPE 2 CREER UNE INSTANCE DE PDFWRITTER
            PdfWriter.getInstance(document, out);

//ETAPE 3 OPEN LE DOCUMENT
            document.open();

//AJOUT DE CONTENU

            for(Card card :cards ) {
                //Paragraph parNom = document.add(new Paragraph(card.getNom()));
                //Document docRect = new Document(new Rectangle(PageSize.A4_LANDSCAPE));
                Paragraph paraNom = new Paragraph(card.getNom());
                BufferedImage img1 = (BufferedImage) ImageIO.read(new URL(card.getImage()));
                Image img = Image.getInstance(toByteArray(img1));
                img.scalePercent(50f);

                Paragraph paraDefinition = new Paragraph(card.getDefinition());
                paraNom.setAlignment(Element.ALIGN_CENTER);
                img.setAlignment(Element.ALIGN_CENTER);
                paraDefinition.setAlignment(Element.ALIGN_CENTER);
                document.add(paraNom);
                document.add(img);              
                document.add(paraDefinition);
                // document.newPage();

            }
            document.close();
        }catch(DocumentException | MalformedURLException e) {
            logger.error(e.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
    private static byte[] toByteArray(BufferedImage img) throws IOException {
        ByteArrayOutputStream bout = new ByteArrayOutputStream();
        ImageIO.write(img,"PNG",bout);
        bout.close();
        return bout.toByteArray();
    }
}