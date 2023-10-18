import java.util.Properties;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Store;

public class EmailClient {

    public static void main(String[] args) {
        // Email account configuration
        String username = "your_email@example.com";
        String password = "your_password";
        String host = "imap.example.com"; // IMAP server address, replace with your server
        int port = 993; // IMAP port for SSL

        try {
            // Set up JavaMail properties
            Properties props = new Properties();
            props.setProperty("mail.store.protocol", "imaps");
            props.setProperty("mail.imaps.host", host);
            props.setProperty("mail.imaps.port", String.valueOf(port));

            // Create a session and connect to the store
            Session session = Session.getInstance(props, null);
            Store store = session.getStore("imaps");
            store.connect(host, username, password);

            // Open the INBOX folder
            Folder inbox = store.getFolder("INBOX");
            inbox.open(Folder.READ_ONLY);

            // List the messages in the INBOX
            Message[] messages = inbox.getMessages();
            for (int i = 0; i < messages.length; i++) {
                System.out.println("Subject: " + messages[i].getSubject());
                System.out.println("From: " + messages[i].getFrom()[0]);
                System.out.println("Date: " + messages[i].getSentDate());
                System.out.println("Message: " + messages[i].getContent());
                System.out.println("----------------------------------------");
            }

            // Close the store and folder
            inbox.close(false);
            store.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}