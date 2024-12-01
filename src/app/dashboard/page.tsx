'use client';

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  const [breadcrumb, setBreadcrumb] = useState<string[]>([
    "",
    "",
  ]);

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar
        onNavigate={(path) => {
          setBreadcrumb(path); // Cập nhật Breadcrumb
        }}
      />

      <SidebarInset>
        {/* Header với Breadcrumb */}
        <header className="flex sticky top-[80px] z-20 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {index === breadcrumb.length - 1 ? (
                      <BreadcrumbPage>{item}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Nội dung chính */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="aspect-video h-12 w-full rounded-lg bg-muted/50"
            />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
