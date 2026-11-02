
const codeElement = document.getElementById("java-code");
const lineNumbers = document.getElementById("line-numbers");
const status = document.getElementById("editor-status");

const javaLines = [
    "public class DerykTech {",
    "",
    "    public static void build() {",
    '        System.out.println("Building ideas...");',
    "    }",
    "",
    "    public static void create() {",
    '        System.out.println("Creating solutions...");',
    "    }",
    "",
    "    public static void digitalize() {",
    '        System.out.println("Transforming the future...");',
    "    }",
    "",
    "    public static void main(String[] args) {",
    "        build();",
    "        create();",
    "        digitalize();",
    "    }",
    "}"
];

async function typeJavaCode() {
    if (!codeElement || !lineNumbers) return;

    codeElement.textContent = "";
    lineNumbers.textContent = "";

    status.textContent = "Writing Java code...";

    for (let i = 0; i < javaLines.length; i++) {
        lineNumbers.textContent += `${i + 1}\n`;

        for (const character of javaLines[i]) {
            codeElement.textContent += character;
            await new Promise(resolve =>
                setTimeout(resolve, 22)
            );
        }

        codeElement.textContent += "\n";
        await new Promise(resolve =>
            setTimeout(resolve, 120)
        );
    }

    status.textContent = "BUILD. CREATE. DIGITALIZE.";
    Prism.highlightElement(codeElement);

}

typeJavaCode();



const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {


contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    if (!formData.name || !formData.email || !formData.message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "";

    try {

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Message could not be sent."
            );
        }

        formStatus.textContent = "Message sent successfully!";
        contactForm.reset();

    } catch (error) {

        formStatus.textContent =
            error.message || "Something went wrong. Please try again.";

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Message →";

    }

});


}
