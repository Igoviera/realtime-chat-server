import { Request, Response, Router } from "express";
import messageSevice from "../services/message.sevice";

const router = Router();

router.post("/message", async (req: Request, res: Response) => {
  try {
    await messageSevice.createUser(req.body);
    res.status(200).send({ message: "Menssage enviada com sucesso" });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/Allmessages", async (req: Request, res: Response) => {
    try {
        const messages = await messageSevice.findAllMessage()
        return res.send(messages)
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
})

export default router;
