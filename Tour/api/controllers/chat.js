import readlineSync from 'readline-sync';
import openai from "../config/open-ai.js";



export const chat = async (req, res, next) => {
  try {
    const { message } = req.body;
    console.log({message})
    // await client.init();
    // const chat = await client.sendMessage(message, 'hutia ', withChatBreak, 
    //   (result) => {console.log({result})});
    console.log({chat})
    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: 'user', content: 'Say this is a test' }],
    //   model: 'gpt-3.5-turbo',
    // });
    // console.log(completion)

    return res.json({status: true, message: ""})
  } catch (err) {
    console.log("Error: ", err)
    return res.json({status: false, message: "Lỗi"})
  }
};