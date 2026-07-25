"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getTenants } from "@/actions/saas";

export type Tenant = {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string;
  databaseStatus: "Pending" | "Provisioning" | "Active" | "Failed";
  dbUrlMasked: string;
  securityLevel: "Standard" | "Extreme";
  createdAt: Date;
  storageUsedGB: number;
  planType: "Free" | "Pro" | "Enterprise";
  status: "Active" | "Suspended" | "Maintenance";
};

export type GlobalMetrics = {
  mrrHistory: { month: string; revenue: number }[];
  serverLoad: { time: string; load: number }[];
};

type SaaSContextType = {
  tenants: Tenant[];
  globalMetrics: GlobalMetrics;
  addTenant: (tenant: Omit<Tenant, "id" | "createdAt" | "databaseStatus" | "storageUsedGB" | "status">) => Promise<string>;
  updateTenantStatus: (id: string, status: Tenant["databaseStatus"], systemStatus?: Tenant["status"]) => void;
  updateTenantDetails: (id: string, details: Partial<Tenant>) => void;
  removeTenant: (id: string) => void;
};

const SaaSContext = createContext<SaaSContextType | undefined>(undefined);

const MOCK_TENANTS: Tenant[] = [
  {
    id: "t_101",
    name: "Springfield High",
    domain: "springfield.erp.example.com",
    logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    databaseStatus: "Active",
    dbUrlMasked: "postgres://saas_***:***@aws-pooler.supabase.com:5432/tenant_101",
    securityLevel: "Standard",
    createdAt: new Date("2025-01-15T08:00:00Z"),
    storageUsedGB: 4.2,
    planType: "Pro",
    status: "Active"
  },
  {
    id: "t_102",
    name: "Global International Academy",
    domain: "gia.erp.example.com",
    databaseStatus: "Active",
    dbUrlMasked: "postgres://saas_***:***@aws-pooler.supabase.com:5432/tenant_102",
    securityLevel: "Extreme",
    createdAt: new Date("2025-03-22T14:30:00Z"),
    storageUsedGB: 18.7,
    planType: "Enterprise",
    status: "Active"
  },
  {
    id: "t_103",
    name: "Lincoln Prep",
    domain: "lincoln.erp.example.com",
    databaseStatus: "Failed",
    dbUrlMasked: "postgres://saas_***:***@aws-pooler.supabase.com:5432/tenant_103",
    securityLevel: "Standard",
    createdAt: new Date("2026-05-10T11:00:00Z"),
    storageUsedGB: 0.1,
    planType: "Free",
    status: "Suspended"
  }
];

const MOCK_METRICS: GlobalMetrics = {
  mrrHistory: [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 14500 },
    { month: "Mar", revenue: 18200 },
    { month: "Apr", revenue: 24000 },
    { month: "May", revenue: 29500 },
    { month: "Jun", revenue: 34200 },
  ],
  serverLoad: [
    { time: "00:00", load: 20 },
    { time: "04:00", load: 15 },
    { time: "08:00", load: 65 },
    { time: "12:00", load: 85 },
    { time: "16:00", load: 70 },
    { time: "20:00", load: 45 },
  ]
};

export function SaaSProvider({ children }: { children: ReactNode }) {
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [globalMetrics] = useState<GlobalMetrics>(MOCK_METRICS);

  useEffect(() => {
    const fetchRealTenants = async () => {
      const result = await getTenants();
      if (result.success && result.tenants) {
        setTenants(result.tenants);
      }
    };
    fetchRealTenants();
  }, []);

  const addTenant = async (tenantData: Omit<Tenant, "id" | "createdAt" | "databaseStatus" | "storageUsedGB" | "status">) => {
    const newId = `t_${Math.floor(Math.random() * 10000)}`;
    const newTenant: Tenant = {
      ...tenantData,
      id: newId,
      databaseStatus: "Pending",
      createdAt: new Date(),
      storageUsedGB: 0,
      status: "Active"
    };
    
    setTenants(prev => [newTenant, ...prev]);
    return newId;
  };

  const updateTenantStatus = (id: string, databaseStatus: Tenant["databaseStatus"], systemStatus?: Tenant["status"]) => {
    setTenants(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, databaseStatus, status: systemStatus || t.status };
      }
      return t;
    }));
  };

  const updateTenantDetails = (id: string, details: Partial<Tenant>) => {
    setTenants(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, ...details };
      }
      return t;
    }));
  };

  const removeTenant = (id: string) => {
    setTenants(prev => prev.filter(t => t.id !== id));
  };

  return (
    <SaaSContext.Provider value={{ tenants, globalMetrics, addTenant, updateTenantStatus, updateTenantDetails, removeTenant }}>
      {children}
    </SaaSContext.Provider>
  );
}

export function useSaaS() {
  const context = useContext(SaaSContext);
  if (context === undefined) {
    throw new Error("useSaaS must be used within a SaaSProvider");
  }
  return context;
}
