"use client";
import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuGroup,
    SidebarMenuItem,
    SidebarProvider,
    SidebarToggle,
} from "vayu-ui";
import {
    LayoutDashboard,
    Settings,
    User,
    ShoppingBag,
    BarChart,
    HelpCircle,
    LogOut,
    Bell,
    Home,
    MessageSquare,
} from "lucide-react";
import { Avatar } from "vayu-ui";

export default function SidebarDemo() {
    return (
        <div className="h-[600px] w-full border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden flex bg-white dark:bg-neutral-950 relative">
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-white font-bold">V</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-neutral-900 dark:text-white">
                                    Vayu UI
                                </span>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Dashboard
                                </span>
                            </div>
                            <div className="ml-auto">
                                <SidebarToggle />
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuGroup label="Overview">
                                <SidebarMenuItem icon={<Home size={20} />} active>
                                    Dashboard
                                </SidebarMenuItem>
                                <SidebarMenuItem icon={<BarChart size={20} />}>
                                    Analytics
                                </SidebarMenuItem>
                                <SidebarMenuItem icon={<ShoppingBag size={20} />} badge="3">
                                    Orders
                                </SidebarMenuItem>
                            </SidebarMenuGroup>

                            <SidebarMenuGroup label="Management">
                                <SidebarMenuItem
                                    icon={<User size={20} />}
                                    subItems={[
                                        { label: "All Users", href: "#" },
                                        { label: "Roles", href: "#" },
                                        { label: "Permissions", href: "#" },
                                    ]}
                                >
                                    Users
                                </SidebarMenuItem>
                                <SidebarMenuItem icon={<MessageSquare size={20} />}>
                                    Messages
                                </SidebarMenuItem>
                                <SidebarMenuItem icon={<Bell size={20} />} badge="9+">
                                    Notifications
                                </SidebarMenuItem>
                            </SidebarMenuGroup>

                            <SidebarMenuGroup label="System">
                                <SidebarMenuItem icon={<Settings size={20} />}>
                                    Settings
                                </SidebarMenuItem>
                                <SidebarMenuItem icon={<HelpCircle size={20} />}>
                                    Help Center
                                </SidebarMenuItem>
                            </SidebarMenuGroup>
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter>
                        <div className="flex items-center gap-3 p-1">
                            <Avatar size="small" username="John Doe">
                                <Avatar.Image
                                    src="https://github.com/shadcn.png"
                                    alt="User"
                                />
                                <Avatar.Fallback />
                            </Avatar>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                                    John Doe
                                </span>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                    john@example.com
                                </span>
                            </div>
                            <button className="ml-auto text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-900 p-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                Dashboard
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-neutral-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
                                >
                                    <div className="h-4 w-24 bg-neutral-100 dark:bg-neutral-800 rounded mb-4" />
                                    <div className="h-8 w-16 bg-neutral-100 dark:bg-neutral-800 rounded" />
                                </div>
                            ))}
                        </div>

                        <div className="h-64 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm" />
                        <div className="h-64 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm" />
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}
