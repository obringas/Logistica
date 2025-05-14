import CryptoJS from "crypto-js";
import {  setGlobalUser,clearGlobalUser } from "@/utils/globalState";
import { getUsers, saveUsers } from "@/utils/userStorage";


const API_URL1 = process.env.NEXT_PUBLIC_API_URL ;
const API_URL2="/api/proxy";
const API_URL="/api";
export async function login1(username: string, password: string ): Promise<boolean> 
  {
  const encryptionKey = "mySecretKey12345";
  const iv = "1234567890123456";

  const encrypt = (text: string) => {
    const key = CryptoJS.enc.Utf8.parse(encryptionKey);
    const ivParsed = CryptoJS.enc.Utf8.parse(iv);

    return CryptoJS.AES.encrypt(text, key, {
      iv: ivParsed,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  };

  const encryptedUsername = encrypt(username);
  const encryptedPassword = encrypt(password);

  const requestBody = {
    applicationName: "StockApp",
    userName: encryptedUsername,
    password: encryptedPassword,
  };

  try {
    const response = await fetch(`${API_URL1}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.token) {
      document.cookie = `auth_token=${data.token}; path=/`; // Guardar token en cookies
      sessionStorage.setItem("user", JSON.stringify(data)); // Usamos sessionStorage para que los datos sean inmediatos
      localStorage.setItem("user", JSON.stringify(data)); // También lo guardamos en localStorage
      setGlobalUser(data); // Actualiza el estado global del usuario;
      return true;
    } else {
      throw new Error("Credenciales incorrectas");
    }
    

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("🚨 Error en la autenticación:", error.message);
    } else {
      console.error("🚨 Error en la autenticación:", error);
    }
    return false;
  }
}
export const login = async (username: string, password: string): Promise<boolean> => {
  // Simulación de delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const fakeUser = {
    id: 1,
    username: username,
    email: `${username}@coprotab.com`,
    role: "admin",
    token: "fake-token",
    applicationName: "StockLogistica",
  };
  
  // Guardar en localStorage/sessionStorage
  sessionStorage.setItem("user", JSON.stringify(fakeUser));
  localStorage.setItem("user", JSON.stringify(fakeUser));
  setGlobalUser(fakeUser);

  return true; // siempre retorna éxito
};
export function logout() {
  document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
  clearGlobalUser(); // Limpiar la variable global
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/login`;
}
export function updateUserData(id: number, newUsername: string, newPassword: string) {
  const users = getUsers();
  const updatedUsers = users.map((u) =>
    u.id === id ? { ...u, username: newUsername, password: newPassword } : u
  );
  saveUsers(updatedUsers);

  // Actualizar también el authUser en localStorage
  const updatedUser = updatedUsers.find((u) => u.id === id);
  if (updatedUser) {
    const newUserData = {
      userId: updatedUser.id,
      userName: updatedUser.username,
     // email: updatedUser.email || '',
      role: updatedUser.role,
      token: '',
      applicationName: 'Local',
    };
    localStorage.setItem("authUser", JSON.stringify(newUserData));
    setGlobalUser(newUserData);
  }
}
export function loginLocal(username: string, password: string): boolean {
  const user = getUsers().find(
    (u) => u.username === username && u.password === password && u.active
  );

  if (user) {
    const userData = {
      userId: user.id,
      userName: user.username,
     // email: user.email || "",
      role: user.role,
      applicationName: "Local",
    };

    // Guardar en cookie (1h)
    document.cookie = `auth_token=${btoa(JSON.stringify(userData))}; path=/; max-age=3600`;
    localStorage.setItem("authUser", JSON.stringify(userData));
    setGlobalUser(userData);

    return true;
  }

  return false;
}