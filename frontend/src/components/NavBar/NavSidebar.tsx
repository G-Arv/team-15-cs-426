import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"

  import { Home, Calendar, NotebookPen, CircleUserRound, Settings, LogOut } from "lucide-react"

  import './NavSidebar.css'

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Schedules",
      url: "/schedule",
      icon: Calendar,
    },
    {
      title: "Journal",
      url: "/journal",
      icon: NotebookPen,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: CircleUserRound,
    },
  ]

  const footerItems = [
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
      {
          title: "Log Out",
          url: "/",
          icon: LogOut,
        },
  ]

  export function NavSidebar() {
    return (
        <Sidebar side="left" collapsible="icon">
        <SidebarHeader>
          <a href={"#"}>
            <img src="src/assets/HerHealthHubLogo.png"/>
          </a>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                {footerItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  }