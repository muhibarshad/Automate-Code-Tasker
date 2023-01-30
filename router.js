import express from "express";

const router = express.Router();
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const configration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configration);
let removeComments = (code) => {
  let lines = code.split("\n");
  let result = [];

  for (let line of lines) {
    let i = line.indexOf("//");
    if (i === -1) {
      result.push(line);
    } else {
      result.push(line.slice(0, i));
    }
  }

  return result.join("\n");
};
router.get("/", async (req, res) => {
  try {
    res.status(200).send({
      message: "hello from muhibGPT ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    const data = response.data.choices[0].text;
    const formattedData = data
      .split("\n")
      .map((line) => line.replace(/^\+/, ""))
      .join("\n");
    const commentsRem = removeComments(formattedData);
    console.log(commentsRem);
    res.status(200).send(commentsRem);
    console.log(prompt);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

export default router;
