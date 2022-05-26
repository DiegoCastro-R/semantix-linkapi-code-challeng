import { Router, Request, Response } from "express";
import { FolderRouter } from './FolderRoutes'
import { FileRouter } from './FileRoutes'

const AppRouter = Router();

AppRouter.get("/", (req: Request, res: Response) => {
    res.send({ health: "ok" });
})

AppRouter.use("/folder", FolderRouter)

AppRouter.use("/file", FileRouter)

export { AppRouter }