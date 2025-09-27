import epxress from "express";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const messageRoute = epxress.Router();

messageRoute.use(arcjetProtection, protectRoute);

messageRoute.get("/contacts", getAllContacts);
messageRoute.get("/chats", getChatPartners);
messageRoute.get("/:id", getMessagesByUserId);
messageRoute.post("/send/:id", sendMessage);

export default messageRoute;
