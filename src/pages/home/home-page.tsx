import {useMemo} from "react";

import {MyTicketsList} from "@/pages/home/my-tickets-list.tsx";
import {Chat} from "@/pages/home/chat.tsx";
import {PendingTicketsList} from "@/pages/home/pending-tickets-list.tsx";


interface HomePageProps {
    showList: "my-tickets" | "pending-tickets";
}

export function HomePage(props: HomePageProps) {

    const renderList = useMemo(() => {
        switch (props.showList) {
            case "my-tickets":
                return <MyTicketsList />;
            case "pending-tickets":
                return <PendingTicketsList />
            default:
                return <MyTicketsList />;
        }
    }, [props.showList]);

    return (
        <>
            {renderList}
            <Chat/>
        </>
    )
}
