import jsCookie from 'js-cookie';
const keyUser = 'authx.user';

export interface Role {
  _id: string;
  name: string;
  privileges: string[];
}

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  dayStart?: string | undefined;
  dayEnd?: string | undefined;
  lunchStart?: string | undefined;
  lunchEnd?: string | undefined;
  slotDuration?: number | 0;
}

const registeredUsers = new Map<string, User>([]);

function newUID(): string {
  const epoch = Math.floor(Date.now() / 1000).toString();
  return `uid:${epoch}`;
}

function newToken(): string {
  return (Math.random() * 1000000000).toString(16);
}

function setSession(user: Omit<User, 'password'>, token: string): void {
  const merged = {
    ...user,
    token,
  };

  localStorage.setItem(keyUser, JSON.stringify(merged));
}

function getSession(): User | null {
  const user = localStorage.getItem(keyUser);
  return user ? JSON.parse(user) : null;
}

function isAuth(): boolean {
  return !!getSession();
}

async function login(username: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = registeredUsers.get(username);
      if (!found) {
        return reject(new Error('User not found'));
      }

      if (found.password !== password) {
        return reject(new Error('Invalid credentials'));
      }

      const token = newToken();
      setSession({
        _id: found._id,
        email: found.email,
        firstName: found.firstName,
        lastName: found.lastName,
        role: found?.role
      }, token);
      resolve(token);
    }, 2000);
  });
}

async function logout(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(keyUser);
      jsCookie.remove('authToken');
      jsCookie.remove('refreshToken');
      resolve();
    }, 1000);
  });
}

async function sendPasswordReset(email: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function addUser(user: Omit<User, 'id'>): Promise<User> {
  return new Promise((resolve) => {
    const id = newUID();
    setTimeout(() => {
      const newUser = { ...user, id };
      registeredUsers.set(user.email, newUser);
      resolve(newUser);
    }, 1000);
  });
}

async function getUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(registeredUsers.values()));
    }, 1000);
  });
}

export {
  getSession,
  setSession,
  isAuth,
  login,
  logout,
  sendPasswordReset,
  addUser,
  getUsers,
};