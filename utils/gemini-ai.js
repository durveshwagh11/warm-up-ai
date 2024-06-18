const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      blockThreshold: HarmBlockThreshold.HIGH,
  },
  {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      blockThreshold: HarmBlockThreshold.HIGH,
  },
  {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      blockThreshold: HarmBlockThreshold.HIGH,
  },
  {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      blockThreshold: HarmBlockThreshold.HIGH,
  },
];

const chatSession = model.startChat({
  generationConfig,
  safetySettings,
});

module.exports = { chatSession };
