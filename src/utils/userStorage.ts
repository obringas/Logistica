// utils/userStorage.ts
import { User, initialUsers } from './users';

const KEY = 'users';

export function getUsers(): User[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [...initialUsers];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(KEY, JSON.stringify(users));
}
