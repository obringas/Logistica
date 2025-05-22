import { useAuth } from "@/context/AuthContext";
import { permissions, Role } from "@/utils/permissions";

export function usePermission() {
  const { user } = useAuth();
  const role = user?.role as Role;

  return {
    hasPermission: (key: keyof (typeof permissions)["admin"]) => {
      return role ? permissions[role][key] : false;
    },
  };
}
