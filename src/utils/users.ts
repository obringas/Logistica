// utils/users.ts
export interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'user';
    active: boolean;
  }
  
  // Datos iniciales
  export const initialUsers: User[] = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', active: true },
    { id: 2, username: 'juan', password: 'juan123', role: 'user', active: true }
  ];
  