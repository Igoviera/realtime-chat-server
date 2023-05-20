import { Request, Response, Router } from "express";
import userService from "../services/user.service";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post('/cadastrar/user', async (req: Request, res: Response) => {
    try {
        await userService.createUser(req.body)
        return res.status(201).send({ messge: 'Usuario cadastrado com sucesso!' })
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const {token, user} = await userService.auth(req.body.cpf, req.body.password)
        res.status(200).send({token, user})
    } catch (error: any) {
        res.status(401).send({message: error.message})
    }
});

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await userService.findAllUsers()
        return res.status(200).send(users)
    } catch (error: any) {
        res.status(400).send({message: error.message})
    }
});

router.get('/user/:id',  async (req: Request, res: Response) => {
    try {
       const user = await userService.userById(req.params.id)
       return res.status(200).send(user)
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.get('/user/:cpf', async (req: Request, res: Response) => {
    try {
        const user = await userService.userByCpf(req.params.cpf)
        return res.status(200).send(user)
    } catch (error: any) {
        res.status(400).send({message: error.message})
    }
})

router.put('/user/update/:id', auth, async (req: Request, res: Response) => {
    try {
        await userService.updateUser(req.params.id, req.body)
        return res.status(201).send({ messge: 'Usuario atualizado com sucesso!' })
    } catch (error: any) {
        res.status(500).send({message: error.message})
    }
});

router.delete('/user/remove/:id', auth, async (req: Request, res: Response) => {
    try {
        await userService.deleteUser(req.params.id)
        return res.status(201).send({message: 'Usuario removido com sucesso'})
    } catch (error: any) {
        res.status(400).send({message: error.message})
    }
})

export default router