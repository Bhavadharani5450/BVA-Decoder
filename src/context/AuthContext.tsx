import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppUser, UserRole, Permission } from '../types';
import { MOCK_USERS } from '../data/mock/mockData';
import { PermissionService } from '../core/permissions/permissionService';

interface AuthContextType {
  currentUser: AppUser;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  can: (permission: Permission) => boolean;
  isAuthenticated: boolean;
  logout: () => void;
  loginAs: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('researcher');
  const [currentUser, setCurrentUser] = useState<AppUser>(MOCK_USERS.researcher);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (MOCK_USERS[role]) {
      setCurrentUser(MOCK_USERS[role]);
    }
  };

  const loginAs = (role: UserRole) => {
    switchRole(role);
  };

  const logout = () => {
    // Return to login screen by resetting to default or guest state
    switchRole('viewer');
  };

  const can = (permission: Permission): boolean => {
    return PermissionService.userCan(currentUser, permission);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        can,
        isAuthenticated: true,
        logout,
        loginAs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
