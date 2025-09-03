export interface UserRole {
  role: Role.ESS | Role.MSS;
}

export enum Role {
  ESS = "ess",
  MSS = "mss",
}
