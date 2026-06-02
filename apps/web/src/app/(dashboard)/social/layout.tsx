import { SocialHubProvider } from "@/lib/SocialHubContext";

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <SocialHubProvider>{children}</SocialHubProvider>;
}
