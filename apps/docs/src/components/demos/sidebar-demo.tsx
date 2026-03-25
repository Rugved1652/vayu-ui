"use client";
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
    MobileMenuButton,
    useSidebar,
    Avatar,
    Typography,
    Divider,
    Button,
} from "vayu-ui";
import {
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

// Inner component to access sidebar context
const SidebarHeaderContent = () => {
    const { collapsed, mobile } = useSidebar();

    return (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shrink-0">
                <span className="text-brand-content font-bold">V</span>
            </div>
            {(!collapsed || mobile) && (
                <div className="flex flex-col">
                    <Typography.Label className="font-bold text-sm text-sidebar-content">
                        Vayu UI
                    </Typography.Label>
                    <Typography.Label variant="secondary" className="text-xs">
                        Dashboard
                    </Typography.Label>
                </div>
            )}
            <div className="ml-auto">
                <SidebarToggle />
            </div>
        </div>
    );
};

export default function SidebarDemo() {
    return (
        <div className="h-150 w-full border border-border rounded-xl overflow-hidden flex bg-canvas relative">
            <SidebarProvider>
                <MobileMenuButton />
                <Sidebar>
                    <SidebarHeader>
                        <SidebarHeaderContent />
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
                                <Typography.Label className="text-sm font-medium text-sidebar-content truncate">
                                    John Doe
                                </Typography.Label>
                                <Typography.Label variant="secondary" className="text-xs truncate">
                                    john@example.com
                                </Typography.Label>
                            </div>
                            <Button
                                variant="ghost"
                                size="small"
                                className="ml-auto"
                                aria-label="Logout"
                            >
                                <Button.Icon size="small">
                                    <LogOut size={18} />
                                </Button.Icon>
                            </Button>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-canvas p-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex items-center justify-between">
                            <Typography.H2 className="text-2xl font-bold text-canvas-content">
                                Dashboard
                            </Typography.H2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-surface p-6 rounded-surface border border-border shadow-surface"
                                >
                                    <div className="h-4 w-24 bg-muted rounded mb-4" />
                                    <div className="h-8 w-16 bg-muted rounded" />
                                </div>
                            ))}
                        </div>

                        <div className="h-64 bg-surface rounded-surface border border-border shadow-surface" />
                        <div className="h-64 bg-surface rounded-surface border border-border shadow-surface" />
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}
