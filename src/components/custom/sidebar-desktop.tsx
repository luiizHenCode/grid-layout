import {Button} from "@/components/ui/button";
import {Clock, LogOutIcon, MessagesSquare, Moon, Settings, Sun} from "lucide-react";
import {useTheme} from "@/components/theme-provider";
import {NavLink} from "react-router";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@/components/ui/label.tsx";
import { useState } from "react";

export function SidebarDesktop() {

    const {setTheme, theme} = useTheme();

    const [transferStatus, setTransferStatus] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const isDarkTheme = theme === "dark";

    const menuTop = [
        {
            label: 'Minhas conversas',
            icon: MessagesSquare,
            to: '/minhas-conversas',
        },
        {
            label: 'Aguardando atendimento',
            icon: Clock,
            to: '/aguardando-atendimento',
        },
    ];

    const menuBottom = [
        {
            label: 'Configurações',
            icon: Settings,
            to: '/configuracoes',
        },

    ];

    return (
        <div className="hidden lg:flex flex-col border-r items-center py-4 justify-between bg-secondary/95">
            <div className="flex flex-col gap-2">
                {
                    menuTop.map((item, i) => (
                        <Tooltip key={i}>
                            <TooltipTrigger asChild>
                                <NavLink to={{pathname: item.to}}>
                                    {
                                        ({isActive}) => (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                data-active={isActive}
                                                className={
                                                    cn(
                                                        "size-10 hover:bg-foreground/5 dark:hover:bg-foreground/5",
                                                        "data-[active=true]:bg-primary data-[active=true]:text-white"
                                                    )}>
                                                <item.icon className="size-4"/>
                                            </Button>
                                        )
                                    }
                                </NavLink>
                            </TooltipTrigger>
                            <TooltipContent showArrow side="right" className="bg-primary text-sm text-white">{item.label}</TooltipContent>
                        </Tooltip>
                    ))
                }
            </div>

            <div className="flex flex-col gap-2">
                {
                    menuBottom.map((item, i) => (
                        <Tooltip key={i}>
                            <TooltipTrigger asChild>
                                <NavLink to={{pathname: item.to}}>
                                    {
                                        ({isActive}) => (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                data-active={isActive}
                                                className={
                                                    cn(
                                                        "size-10 hover:bg-foreground/5 dark:hover:bg-foreground/5",
                                                        "data-[active=true]:bg-primary data-[active=true]:text-white"
                                                    )}>
                                                <item.icon className="size-4"/>
                                            </Button>
                                        )
                                    }
                                </NavLink>
                            </TooltipTrigger>
                            <TooltipContent showArrow side="right" className="bg-primary text-sm text-white">{item.label}</TooltipContent>
                        </Tooltip>
                    ))
                }

                <Button
                    onClick={toggleTheme}
                    size="icon"
                    variant="ghost"
                    className="size-10 hover:bg-primary/10">
                    {
                        isDarkTheme ? (
                            <Moon className="size-4" />
                        ) : (
                            <Sun className="size-4" />
                        )
                    }
                </Button>


                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="icon" variant="ghost" className="size-10 hover:bg-primary/10">
                            <Avatar className="size-6 bg-primary">
                                <AvatarImage />
                                <AvatarFallback className="bg-primary text-white">
                                    <span className="text-xs scale-75 font-bold">LH</span>
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent side="right" align="end" className="p-0 block max-lg:hidden">
                        <div className="flex flex-col">

                            <div className="flex items-center gap-2 p-3">
                                <Avatar className="size-8 bg-primary">
                                    <AvatarImage />
                                    <AvatarFallback className="bg-primary text-white">
                                        <span className="text-xs font-bold">LH</span>
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm leading-3">Luiz Henrique</span>
                                    <small className="text-muted-foreground leading-3">@username</small>
                                </div>
                            </div>

                            <Separator />

                            <div className="p-3 gap-3 flex flex-col">

                                <div className="bg-muted-foreground/5 rounded-md">

                                    <div className="flex flex-col p-3 gap-1">
                                    <small className="text-muted-foreground">Permitir transferencia de conversas?</small>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="transfer-status"
                                                    checked={transferStatus}
                                                    onCheckedChange={(checked) => setTransferStatus(checked)}
                                                    className="scale-80 -ml-0.5"/>
                                            <Label htmlFor="transfer-status" className="text-sm">
                                                {transferStatus ? "Permitir transferências" : "Negar transferências"}
                                            </Label>
                                        </div>

                                    </div>
                                </div>

                                </div>

                                    <Button variant="destructive" className="w-full justify-between">
                                        Sair da conta
                                        <LogOutIcon />
                                    </Button>

                            </div>



                        </div>
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    )
}
