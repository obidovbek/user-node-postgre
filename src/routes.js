import { Router } from "express"
import { userRegister } from "./components/users/register.js";
const routes = Router();

routes.get('/user/register', userRegister.bind(this))

export default routes;