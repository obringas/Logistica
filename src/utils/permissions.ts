export type Role = "admin" | "user";

export const permissions = {
  admin: {
    canAccessUsers: true,
    canCreateUsers: true,
    canEditUsers: true,
    canViewReports: true,
    canAccessStock: true,
  },
  user: {
    canAccessUsers: false,
    canCreateUsers: false,
    canEditUsers: false,
    canViewReports: true,
    canAccessStock: true,
  },
};
