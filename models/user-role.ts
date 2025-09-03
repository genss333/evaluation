export interface UserRole {
  role: Role.ESS | Role.MSS;
}

export enum Role {
  ESS = "ESS",
  MSS = "MSS",
}
