import express from "express"
import { createPost } from "./review.controller.js"

const router = express.Router()

router.post("/create-post", createPost)

export default router
