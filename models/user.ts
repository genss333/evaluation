import { JWTPayload } from "jose";
import { Role } from "./user-role";

export interface User extends JWTPayload {
  id: string;
  email: string;
  name: string;
  role: Role.ESS | Role.MSS;
}
