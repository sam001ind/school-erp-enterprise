"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardView from "@/components/social/views/DashboardView";
import BrandsView from "@/components/social/views/BrandsView";
import ChannelsView from "@/components/social/views/ChannelsView";
import PublishingView from "@/components/social/views/PublishingView";
import CalendarView from "@/components/social/views/CalendarView";
import MediaView from "@/components/social/views/MediaView";
import InboxView from "@/components/social/views/InboxView";
import MonitoringView from "@/components/social/views/MonitoringView";
import AnalyticsView from "@/components/social/views/AnalyticsView";
import ReportsView from "@/components/social/views/ReportsView";
import AuditLogView from "@/components/users/views/AuditLogView";

function SocialModuleContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  let content;
  switch (tab) {
    case "dashboard": content = <DashboardView />; break;
    case "brands": content = <BrandsView />; break;
    case "channels": content = <ChannelsView />; break;
    case "publishing": content = <PublishingView />; break;
    case "calendar": content = <CalendarView />; break;
    case "media": content = <MediaView />; break;
    case "inbox": content = <InboxView />; break;
    case "monitoring": content = <MonitoringView />; break;
    case "analytics": content = <AnalyticsView />; break;
    case "reports": content = <ReportsView />; break;
    case "audit":
      content = <AuditLogView resourceFilter="Social" />;
      break;
    default: content = <DashboardView />; break;
  }

  // InboxView and MonitoringView are full-bleed edge-to-edge layouts, so they don't get the global padding wrapper.
  if (tab === "inbox" || tab === "monitoring") {
    return content;
  }

  return (
    <div className="p-6 h-full">
      {content}
    </div>
  );
}

export default function SocialModulePage() {
  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center p-8">Loading Social Module...</div>}>
      <SocialModuleContent />
    </Suspense>
  );
}
