async function processText() {
    const input = document.getElementById('inputField').value;
    const outputDiv = document.getElementById('output');
    const resultText = document.getElementById('resultText');

    if (!input) return alert("Please enter some text!");

    // Access the key from the environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Use API_KEY in your fetch call
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Explain this in simple terms for a non-expert, then provide a summary in simple local language: ${input}` }] }]
            })
        });

        const data = await response.json();
        resultText.innerText = data.candidates[0].content.parts[0].text;
        outputDiv.classList.remove('hidden');
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to AI. Check your API key.");
    }
}
