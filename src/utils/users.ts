// utils/users.ts
export interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'user';
    active: boolean;
    email?: string; 
    applicationName?: string; 
      token?: string;
  }
  
  // Datos iniciales
  export const initialUsers: User[] = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', active: true, email: '', applicationName: 'StockLogistica' },
    { id: 2, username: 'daltamirano', password: 'Daniel2025', role: 'user', active: true, email: 'daltamirano@acopiardora.com.ar', applicationName: 'StockLogistica' },
    { id: 3, username: 'perazo', password: 'Albo2025', role: 'user', active: true, email: 'perazo@acopiadora.com.ar', applicationName: 'StockLogistica' },
    { id: 4, username: 'lalbarracin', password: 'Lucas2025', role: 'user', active: true, email: 'lalbarracin@acopiadora.com.ar', applicationName: 'StockLogistica' },
  ];
  
  