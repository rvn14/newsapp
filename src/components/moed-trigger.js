import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
export function ModeToggle() {
    const { setTheme } = useTheme();
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "icon", className: "focus-visible:ring-0 bg-darkprimary outline-0 border-0 dark:bg-darkprimary hover:bg-white/5 hover:text-white p-4", children: [_jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), _jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "bg-darkprimary text-white p-2 rounded-md border-0", children: [_jsx(DropdownMenuItem, { className: "focus:bg-white/20 focus:text-white", onClick: () => setTheme("light"), children: "Light" }), _jsx(DropdownMenuItem, { className: "focus:bg-white/20 focus:text-white", onClick: () => setTheme("dark"), children: "Dark" }), _jsx(DropdownMenuItem, { className: "focus:bg-white/20 focus:text-white", onClick: () => setTheme("system"), children: "System" })] })] }));
}
