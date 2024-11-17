import {Request, Response} from "express";
import {Router as createRouter} from "express";

import {contactController} from "./controllers/contactController";
import {genshinController} from "./controllers/genshinController";
const router = createRouter();

// Here will be all our routes
router.get("/genshin/generate-uuid", genshinController.generateUuid);
router.post("/genshin/login", genshinController.loginWithUuid);
router.post("/genshin/getData", genshinController.getOneData);
router.post("/genshin/saveData", genshinController.saveOneData);
router.delete("/genshin/delete", genshinController.deleteOneData);
router.delete("/genshin/delete/user", genshinController.deleteOneUser);

router.post("/contact", contactController.contactSendMail);

// Handling all other route unassigned to a controller method
router.use((_req: Request, res: Response): void => {
    res.status(404).json(
        `Cette route (${_req.originalUrl}) n'est pas gérée par le serveur.`
    );
});

export default router;
