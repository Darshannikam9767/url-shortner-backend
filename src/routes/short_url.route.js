import express from "express"
import { createCustomShortUrl, createShortUrl } from "../controller/shortUrl.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/",authMiddleware,createShortUrl)
router.post("/customurl",authMiddleware,createCustomShortUrl)

export default router