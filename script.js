function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

const OPENAI_API_KEY = "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";  
async function handleAIQuestion() {
    const question = document.getElementById("ai-question").value.trim();
    const responseBox = document.getElementById("ai-response");

    if (!question) {
        responseBox.textContent = "Skriv in en fråga först.";
        return;
    }

    responseBox.textContent = "AI svarar...";

    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        max_tokens: 100,
        temperature: 0.7


    };

    console.log("Skickar API-anrop:", requestBody);

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("API Svar:", data);

        if (response.ok) {
            responseBox.textContent = data.choices[0].message.content.trim();
        } else {
            console.error("Fel vid API-anrop:", data);
            responseBox.textContent = `Fel: ${data.error.message}`;
        }
    } catch (error) {
        console.error("Fel vid anrop till OpenAI API:", error);
        responseBox.textContent = "Ett fel uppstod. Försök igen.";
    }
}





