import Router from "express-promise-router";
import convertController from "@/controllers/convert";

const router = Router();
export default router;

router.post('/', convertController.create);
