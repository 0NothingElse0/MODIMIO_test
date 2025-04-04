import express from "express";
import cors from "cors";
import authRouter from "./backend/routers/authRouterBase.js";
import adminRouter from "./backend/routers/adminRouterBase.js";
import usersRouter from "./backend/routers/usersRouterBase.js";
import unhandledRouter from "./backend/routers/unhandledRouter.js";
import { options } from "./common/swagger/swagger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cookieParser from "cookie-parser";

const swaggerSpecs = swaggerJSDoc(options);

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use('/manifest.json',express.static('manifest.json'));
app.use("/api", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users", usersRouter);
app.use("*", unhandledRouter);

export default app;
