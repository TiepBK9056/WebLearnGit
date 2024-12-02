import * as React from "react";
import { ChevronRight, GalleryVerticalEnd } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Introduction to Git",
      url: "#",
      items: [
        {
          title: "VCS and Git",
          url: "#",
        },
        {
          title: "Git init",
          url: "#",
        },
        {
          title: "Git clone",
          url: "#",
        },
      ],
    },
    {
      title: "Git Basics",
      url: "#",
      items: [
        {
          title: "Git add",
          url: "#",
        },
        {
          title: "Git status",
          url: "#",
        },
        {
          title: "Git commit",
          url: "#",
        },
        {
          title: "View history with Git log",
          url: "#",
        },
      ],
    },
    {
      title: "Review & Undo",
      url: "#",
      items: [
        {
          title: "Git diff",
          url: "#",
        },
        {
          title: "Git reset",
          url: "#",
        },
      ],
    },
    {
      title: "Repository Operations",
      url: "#",
      items: [
        {
          title: "Git checkout",
          url: "#",
        },
        {
          title: "Core Git repository",
          url: "#",
        },
      ],
    },
    {
      title: "Branch Management",
      url: "#",
      items: [
        {
          title: "Branching in Git",
          url: "#",
        },
        {
          title: "Git merge",
          url: "#",
        },
        {
          title: "Git rebase",
          url: "#",
        },
      ],
    },
    {
      title: "Remote Repositories",
      url: "#",
      items: [
        {
          title: "Git Remote Basics",
          url: "#",
        },
        {
          title: "Git remote",
          url: "#",
        },
        {
          title: "Git push",
          url: "#",
        },
        {
          title: "Git fetch",
          url: "#",
        },
        {
          title: "Git pull",
          url: "#",
        },
      ],
    },
  ],
}


export function AppSidebar({
  onNavigate,
  ...props
}: React.ComponentProps<typeof Sidebar> & { onNavigate: (path: string[]) => void }) {
  const [activeItem, setActiveItem] = React.useState<string>("");

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation Git</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible key={item.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              onClick={() => {
                                setActiveItem(subItem.title); // Cập nhật trạng thái active
                                onNavigate([item.title, subItem.title]);
                              }}
                            >
                              <a
                                href={subItem.url}
                                className={`${
                                  activeItem === subItem.title
                                    ? "text-blue-600 font-bold" // Màu sắc khi active
                                    : "text-gray-700"
                                } hover:text-blue-500`}
                              >
                                {subItem.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
