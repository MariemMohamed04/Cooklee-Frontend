export interface Session {
  isAuthenticated: boolean;
  Email?: string;
  Name?: string;
  UserId?: string;
  Roles?: string[];
  token?: string; // Add this line
}