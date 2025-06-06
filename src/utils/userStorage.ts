// utils/userStorage.ts
import CryptoJS from "crypto-js";
import { User, initialUsers } from "./users";

const KEY = "users_secure";
const SECRET_KEY = "claveSegura123456";

// 🔐 Encripta texto plano
function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

// 🔐 Desencripta texto cifrado
function decrypt(cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function getUsers(): User[] {
  const encrypted = localStorage.getItem(KEY);
  if (!encrypted) return [...initialUsers];

  try {
    const decrypted = decrypt(encrypted);
    return JSON.parse(decrypted);
  } catch (e) {
    console.warn("❌ Error al desencriptar usuarios, se cargan los iniciales");
    return [...initialUsers];
  }
}

export function saveUsers(users: User[]) {
  const plain = JSON.stringify(users);
  const encrypted = encrypt(plain);
  localStorage.setItem(KEY, encrypted);
}
