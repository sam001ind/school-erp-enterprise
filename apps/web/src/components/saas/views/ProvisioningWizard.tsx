"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSaaS } from "@/lib/SaaSContext";
import { Database, ShieldAlert, Terminal as TerminalIcon, Check, ChevronRight, Play } from "lucide-react";

export default function ProvisioningWizard() {
  const { addTenant, updateTenantStatus } = useSaaS();
  const [step, setStep] = useState(1);
  const [tenantName, setTenantName] = useState("");
  const [domain, setDomain] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [dbUrl, setDbUrl] = useState("");
  const [dbEngine, setDbEngine] = useState<"PostgreSQL" | "MySQL" | "MongoDB" | "SQL Server">("PostgreSQL");
  const [cloudProvider, setCloudProvider] = useState<"AWS" | "Azure" | "Google Cloud" | "Supabase">("Supabase");
  const [frontendHosting, setFrontendHosting] = useState<"Vercel" | "AWS Amplify" | "Netlify" | "Self-Hosted">("Vercel");
  const [security, setSecurity] = useState<"Standard" | "Extreme">("Standard");
  const [planType, setPlanType] = useState<"Free" | "Pro" | "Enterprise">("Pro");
  
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleProvision = async () => {
    if (!tenantName || !domain || !dbUrl) return;
    setIsProvisioning(true);
    setStep(4);
    setLogs(["[SYSTEM] Initiating SaaS Provisioning Engine...", "[DB] Validating connection string..."]);
    
    const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':***@');
    const tenantId = await addTenant({
      name: tenantName,
      domain,
      logoUrl,
      dbUrlMasked: maskedUrl,
      securityLevel: security,
      planType: planType
    });

    updateTenantStatus(tenantId, "Provisioning");

    // Simulate terminal outputs
    setTimeout(() => setLogs(l => [...l, `[${frontendHosting}] Initializing Edge functions and routing...`]), 1000);
    setTimeout(() => setLogs(l => [...l, `[${cloudProvider}] Negotiating secure handshake with cluster...`]), 2000);
    setTimeout(() => setLogs(l => [...l, `[DB] Connection to ${dbEngine} successful. Target DB isolated.`]), 3000);
    setTimeout(() => setLogs(l => [...l, `[PRISMA] Applying ${dbEngine === 'MongoDB' ? 'NoSQL indexes' : 'schema migrations (prisma db push)'}...`]), 4000);
    setTimeout(() => setLogs(l => [...l, `  - Created ${dbEngine === 'MongoDB' ? 'collection' : 'table'}: Users`]), 4500);
    setTimeout(() => setLogs(l => [...l, `  - Created ${dbEngine === 'MongoDB' ? 'collection' : 'table'}: Students`]), 4800);
    setTimeout(() => setLogs(l => [...l, `  - Created ${dbEngine === 'MongoDB' ? 'collection' : 'table'}: Fees`]), 5100);
    setTimeout(() => setLogs(l => [...l, `[PRISMA] ${dbEngine === 'MongoDB' ? 'Collections' : 'Schemas'} generated successfully.`]), 6000);
    setTimeout(() => setLogs(l => [...l, "[SEED] Seeding default roles and SuperAdmin user..."]), 7000);
    
    if (security === "Extreme") {
      setTimeout(() => setLogs(l => [...l, "[SECURITY] Enforcing Row-Level Security (RLS) policies..."]), 7000);
      setTimeout(() => setLogs(l => [...l, "[SECURITY] Generating Transparent Data Encryption (TDE) keys..."]), 8000);
    }

    setTimeout(() => {
      setLogs(l => [...l, "[SYSTEM] Provisioning Complete. Tenant is active!"]);
      updateTenantStatus(tenantId, "Active");
      setIsProvisioning(false);
    }, security === "Extreme" ? 10500 : 8500);
  };

  return (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col lg:flex-row">
      
      {/* Sidebar - Steps */}
      <div className="w-full lg:w-1/3 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-900/80 p-8 border-r border-slate-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Provisioning Engine</h2>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-zinc-700 before:to-transparent">
          {[
            { num: 1, title: "School Details", desc: "Basic tenant identity." },
            { num: 2, title: "Database & Cloud", desc: "Select engine & provider." },
            { num: 3, title: "Security Policies", desc: "Isolation and encryption." },
            { num: 4, title: "Run Provisioner", desc: "Schema migrations." }
          ].map((s) => (
            <div key={s.num} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${step >= s.num ? 'border-indigo-500 text-indigo-500' : 'border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-400 dark:text-slate-500 dark:text-slate-500'}`}>
                {step > s.num ? <Check className="w-5 h-5" /> : <span className="font-bold text-sm">{s.num}</span>}
              </div>
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl transition-all ${step === s.num ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 shadow-sm border border-slate-200 dark:border-zinc-800 dark:border-zinc-700' : 'opacity-60'}`}>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:w-2/3 p-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Step 1: Tenant Identity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">School / Institution Name</label>
                <input type="text" value={tenantName} onChange={e => setTenantName(e.target.value)} placeholder="e.g. Springfield High" className="w-full px-4 py-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subdomain Mapping</label>
                <div className="flex">
                  <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="springfield" className="w-full px-4 py-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-950 border border-r-0 border-slate-200 dark:border-zinc-800 rounded-l-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <span className="px-4 py-2 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-l-0 border-slate-200 dark:border-zinc-800 rounded-r-xl text-slate-500 dark:text-slate-400">.erp.example.com</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Institution Logo URL</label>
                <input type="text" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" className="w-full px-4 py-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Subscription Plan</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Free", "Pro", "Enterprise"].map((plan) => (
                    <div 
                      key={plan}
                      onClick={() => setPlanType(plan as any)}
                      className={`px-4 py-3 rounded-xl border text-center cursor-pointer text-sm font-semibold transition-all \${planType === plan ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-400' : 'bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300'}`}
                    >
                      {plan}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6">
                <button onClick={() => setStep(2)} disabled={!tenantName || !domain} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        { step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-indigo-500"/> Step 2: Database & Cloud Infrastructure</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Select your preferred cloud provider and database engine. Our ORM handles the complex migrations automatically.</p>
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Frontend Hosting</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Vercel", "AWS Amplify", "Netlify", "Self-Hosted"].map((host) => (
                    <div 
                      key={host}
                      onClick={() => setFrontendHosting(host as any)}
                      className={`px-4 py-3 rounded-xl border text-center cursor-pointer text-sm font-semibold transition-all ${frontendHosting === host ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-400' : 'bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:border-indigo-300'}`}
                    >
                      {host}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Database Provider</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Supabase", "AWS", "Azure", "Google Cloud"].map((cloud) => (
                    <div 
                      key={cloud}
                      onClick={() => setCloudProvider(cloud as any)}
                      className={`px-4 py-3 rounded-xl border text-center cursor-pointer text-sm font-semibold transition-all ${cloudProvider === cloud ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-400' : 'bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:border-indigo-300'}`}
                    >
                      {cloud}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Database Engine</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["PostgreSQL", "MySQL", "MongoDB", "SQL Server"].map((engine) => (
                    <div 
                      key={engine}
                      onClick={() => setDbEngine(engine as any)}
                      className={`px-4 py-3 rounded-xl border text-center cursor-pointer text-sm font-semibold transition-all ${dbEngine === engine ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-400' : 'bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:border-indigo-300'}`}
                    >
                      {engine}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
                  <span>{dbEngine} Connection URI</span>
                  <span className="text-xs text-indigo-500 font-medium">Auto-formats for Supabase pooler</span>
                </label>
                <input 
                  type="password" 
                  value={dbUrl} 
                  onChange={e => setDbUrl(e.target.value)} 
                  placeholder={cloudProvider === 'Supabase' ? "postgresql://postgres.[project]:[password]@aws-0-pooler.supabase.com:5432/postgres" : `${dbEngine.toLowerCase()}://user:password@host:port/dbname`} 
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm shadow-sm" 
                />
              </div>

              <div className="pt-6 flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-2.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700">Back</button>
                <button 
                  onClick={() => {
                    setIsTestingConnection(true);
                    setTimeout(() => {
                      setIsTestingConnection(false);
                      setStep(3);
                    }, 1500);
                  }} 
                  disabled={!dbUrl || isTestingConnection} 
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 shadow-sm min-w-[140px]"
                >
                  {isTestingConnection ? (
                    <span className="animate-pulse">Testing...</span>
                  ) : (
                    <>Next Step <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-purple-500"/> Step 3: Security Policies</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Configure the isolation level for this tenant's data environment.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div 
                onClick={() => setSecurity("Standard")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${security === "Standard" ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 hover:border-indigo-300'}`}
              >
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center justify-between">Standard Isolation {security === "Standard" && <Check className="w-4 h-4 text-indigo-500"/>}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Logical separation via schemas. Standard SSL encryption in transit. Ideal for standard deployments.</p>
              </div>
              <div 
                onClick={() => setSecurity("Extreme")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${security === "Extreme" ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 hover:border-purple-300'}`}
              >
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center justify-between">Extreme Security {security === "Extreme" && <Check className="w-4 h-4 text-purple-500"/>}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Physical DB isolation. Transparent Data Encryption (TDE) at rest. Strict IP whitelisting enforced.</p>
              </div>
            </div>

            <div className="pt-6 flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700">Back</button>
              <button onClick={handleProvision} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 shadow-lg shadow-indigo-500/30">
                <Play className="w-4 h-4" /> Start Provisioning
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-slate-500 dark:text-slate-400"/> Migration Terminal
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {isProvisioning ? "Provisioning database schema and seeding data..." : "Provisioning complete. You can now close this wizard."}
            </p>
            
            <div 
              ref={terminalRef}
              className="flex-1 bg-zinc-950 rounded-xl p-4 font-mono text-sm overflow-y-auto max-h-80 border border-zinc-800 shadow-inner custom-scrollbar"
            >
              {logs.map((log, i) => {
                let colorClass = 'text-zinc-300';
                if (log.includes('[SYSTEM]')) colorClass = 'text-blue-400 font-bold';
                if (log.includes('[PRISMA]')) colorClass = 'text-emerald-400';
                if (log.includes('[SECURITY]')) colorClass = 'text-purple-400';
                if (log.includes('[DB]')) colorClass = 'text-amber-400';

                return (
                  <div key={i} className={`mb-1 ${colorClass}`}>
                    <span className="text-zinc-600 dark:text-zinc-500 mr-2">{'>'}</span>{log}
                  </div>
                );
              })}
              {isProvisioning && (
                <div className="text-zinc-500 animate-pulse mt-2"><span className="text-zinc-600 mr-2">{'>'}</span>_</div>
              )}
            </div>

            {!isProvisioning && (
              <div className="pt-6">
                 <button onClick={() => {
                   setStep(1);
                   setTenantName("");
                   setDomain("");
                   setDbUrl("");
                   setLogs([]);
                 }} className="px-6 py-2.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700">
                  Provision Another Tenant
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
