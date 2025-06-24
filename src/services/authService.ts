import CryptoJS from "crypto-js";
//import {  setGlobalUser,clearGlobalUser } from "@/utils/globalState1";
import { getUsers, saveUsers } from "@/utils/userStorage";
import { setAuthCookie } from "@/utils/authUtils";


const API_URL1 = process.env.NEXT_PUBLIC_API_URL ;
const API_URL2="/api/proxy";
const API_URL="/api";
// Interfaz del usuario que esperamos del contexto (sin la contraseña)
interface User {
  userId: number;
  userName: string;
  email: string;
  role: string;
  token: string;
  applicationName?: string;
}

export async function loginLocal(username: string, password: string): Promise<User | null> {
  const users = getUsers();
  const matchedUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!matchedUser || !matchedUser.active) {
    console.error("Login fallido: Credenciales incorrectas o usuario inactivo.");
    return null; // Si falla, devuelve null
  }

  // Si el login es exitoso...
  const fakeToken = generateFakeJwt({
    userId: matchedUser.id,
    userName: matchedUser.username,
    role: matchedUser.role,
    exp: Math.floor(Date.now() / 1000) + 15 * 60,
  });

  const userData = {
    userId: matchedUser.id,
    userName: matchedUser.username,
    email: matchedUser.email || "",
    role: matchedUser.role,
    applicationName: matchedUser.applicationName || 'N/A',
    token: fakeToken,
  };

  // El servicio se encarga de persistir los datos
  localStorage.setItem("user", JSON.stringify(userData));
  setAuthCookie(userData.token);

  // Devuelve el objeto de usuario completo
  return userData;
}



export async function loginLocalNoAndadeAfuera(username: string, password: string): Promise<boolean> {
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

  const users = getUsers();
  const matchedUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (matchedUser) {
    const fakeToken = generateFakeJwt({
      userId: matchedUser.id,
      userName: matchedUser.username,
      role: matchedUser.role || "user",
      exp: Math.floor(Date.now() / 1000) + 15 * 60, // ⏰ 15 minutos
    });

      const userData = {
      userId: matchedUser.id,
      userName: matchedUser.username,
      role: matchedUser.role || "user",
      token: fakeToken,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    //setGlobalUser(userData);
    setAuthCookie(userData.token);

    return true;
  }

  return false;
}

function generateFakeJwt(payload: object): string {
  const header = { alg: "HS256", typ: "JWT" };
  const encode = (obj: object) => btoa(JSON.stringify(obj)).replace(/=/g, "");
  return `${encode(header)}.${encode(payload)}.signature`;
}



export function logout() {
 performFullLogout();
}

export function updateUserDataanterior(id: number, newUsername: string, newPassword: string) {
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
   // setGlobalUser(newUserData);
  }
}


export function updateUserData(
  id: number, 
  dataToUpdate: { password?: string; email?: string }
) {
  const users = getUsers();

  const updatedUsers = users.map((u) => {
    if (u.id === id) {
      // Fusionamos el usuario existente con los nuevos datos
      return { ...u, ...dataToUpdate };
    }
    return u;
  });
  saveUsers(updatedUsers);

  const updatedUser = updatedUsers.find((u) => u.id === id);

  if (updatedUser) {
    // Generamos un nuevo token para reflejar los cambios y refrescar la sesión
    const newFakeToken = generateFakeJwt({
      userId: updatedUser.id,
      userName: updatedUser.username,
      role: updatedUser.role,
      exp: Math.floor(Date.now() / 1000) + 15 * 60,
    });

    const newUserData = {
      userId: updatedUser.id,
      userName: updatedUser.username,
      email: updatedUser.email || '',
      role: updatedUser.role,
      applicationName: updatedUser.applicationName || 'N/A',
      token: newFakeToken,
    };
    
    // Actualizamos el localStorage y la cookie para mantener todo sincronizado
    localStorage.setItem("user", JSON.stringify(newUserData));
    setAuthCookie(newUserData.token);
    // Ya no es necesario llamar a setGlobalUser porque el AuthContext es la fuente de verdad
  }
  
}
/**
 * Realiza un cierre de sesión completo, limpiando todo el almacenamiento del navegador
 * y todas las cookies del dominio de la aplicación antes de redirigir al login.
 */
export function performFullLogout() {
  console.log("Cierre de sesión iniciado. Limpiando todo...");

  // 1. Borrar TODO el Local Storage
  // Esto es más potente que `removeItem`, ya que borra cualquier otra
  // información que se haya podido guardar.
  try {
    console.log("Borrando Local Storage...");
    localStorage.clear();
    console.log("✅ Local Storage borrado.");
  } catch (e) {
    console.error("No se pudo borrar Local Storage:", e);
  }

  // 2. Borrar TODO el Session Storage
  try {
    console.log("Borrando Session Storage...");
    sessionStorage.clear();
    console.log("✅ Session Storage borrado.");
  } catch (e) {
    console.error("No se pudo borrar Session Storage:", e);
  }

  // 3. Borrar todas las cookies del dominio
  // Este es un proceso más complejo, ya que no hay un método directo.
  // La forma de borrar una cookie es sobreescribirla con una fecha de expiración pasada.
  console.log("Borrando cookies...");
  const cookies = document.cookie.split(";");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/';

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    
    // Se intenta borrar la cookie para la ruta raíz y la ruta del basePath,
    // cubriendo los casos más comunes.
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    if (basePath !== '/') {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${basePath}`;
    }
  }
  console.log("✅ Cookies borradas.");

  // 4. Redirigir al login
  // Usamos window.location.href para forzar una recarga completa de la página.
  // Esto es ideal para el logout, ya que limpia cualquier estado en memoria
  // de la aplicación (como los contextos de React).
  console.log("Redirigiendo a la página de login...");
  window.location.href = `${basePath}/login`;
}