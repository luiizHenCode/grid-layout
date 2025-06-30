import {cn} from "@/lib/utils.ts";
import {SidebarDesktop} from "@/components/custom/sidebar-desktop.tsx";
import {SidebarMobile} from "@/components/custom/sidebar-mobile.tsx";
import {Outlet, useParams} from "react-router";

export function AppLayout() {

    const params = useParams() as {ticketId?: string};
    const hasTicketId = !!params.ticketId;

    return (
        <div
            className={
            cn(
                "h-dvh min-h-0 overflow-hidden grid md:grid-rows-1 w-full",
                !hasTicketId && "grid-rows-[1fr_64px]",
                )
            }>
            <div className={
                cn(
                    "grid h-full min-h-0",
                    "grid-cols-1 md:grid-cols-[minmax(300px,368px)_2fr] lg:grid-cols-[64px_minmax(300px,368px)_2fr]"
                )
            }>
                <SidebarDesktop />

                <Outlet />

            </div>
            <SidebarMobile />
        </div>
    )
}
