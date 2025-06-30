import {Clock, MessagesSquare, Settings} from "lucide-react";
import {NavLink, useParams} from "react-router";
import {cn} from "@/lib/utils.ts";

export function SidebarMobile() {

    const params = useParams() as {ticketId?: string};
    const hasTicketId = !!params.ticketId;

    const bottomNavigation = [
        {
            label: 'Conversas',
            icon: MessagesSquare,
            to: '/minhas-conversas',
        },
        {
            label: 'Aguardando',
            icon: Clock,
            to: '/aguardando-atendimento',
        },
        {
            label: 'Configurações',
            icon: Settings,
            to: '/configuracoes',
        },
        // {
        //     label: 'Perfil',
        //     icon: UserCircle,
        //     to: '/perfil',
        // }
    ]



    return (
        <div className={
            cn(
                "flex lg:hidden flex-row bg-secondary/95 border-t h-16",
                hasTicketId && "not-md:hidden",
                )
        }>
            {
                bottomNavigation.map((item) => (
                    <NavLink
                        key={item.label}
                        to={{pathname: item.to}}
                        className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-foreground/10"
                    >
                        {
                            ({isActive}) =>  (
                                <>
                                <item.icon data-active={isActive} className="size-5 data-[active=true]:text-primary" />
                                <small data-active={isActive} className="text-xs text-muted-foreground scale-85 data-[active=true]:text-primary/70">{item.label}</small>
                                </>
                            )
                        }
                    </NavLink>
                ))
            }
        </div>
    )
}
