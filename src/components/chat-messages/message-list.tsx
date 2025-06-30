import {cn} from "@/lib/utils.ts";

interface MessageListProps {
    side: 'left' | 'right';
}

export function MessageList(props: MessageListProps) {

    const items = [
        { id: '1', text: 'Emergência' },
        { id: '2', text: 'list agendamento' },
        { id: '3', text: 'novo agendamento' },
        { id: '4', text: 'teste massiva telefone' },
        { id: '5', text: 'achar cpf' },
        { id: '6', text: 'Link Pedido' },
        { id: '7', text: 'Link Form' },
        { id: '8', text: 'Agendas diferentes' },
        { id: '9', text: 'identificar cliente' },
    ];

    return (
        <div
            data-side={props.side}
            className="flex flex-col data-[side=right]:items-end data-[side=left]:items-start gap-2">
            <div
                data-side={props.side}
                className={
                cn(
                    "p-3 rounded-xl max-w-86 flex flex-col gap-2",
                    "data-[side=left]:bg-secondary data-[side=right]:bg-primary data-[side=right]:text-white"
                )
            }>
                <small className="text-xs font-semibold">List</small>
                <p className="text-sm">
                    Olá, tudo bem? Escolha um tipo de atendimento.
                </p>
                <small className="text-xs text-white/60">Selecione um item</small>

            </div>

            <div
                data-side={props.side}
                className={
                cn(
                     "p-1 rounded-xl text-sm shadow-sm max-w-86 w-full flex flex-col",
                     "data-[side=left]:bg-secondary data-[side=right]:bg-primary data-[side=right]:text-white",
                 )
            }>

            {
                items.map((item) => (
                    <div key={item.id} className={
                        cn(
                            "p-2 text-sm w-full bg-black/15 border-b border-foreground/20",
                            "last:border-none first:rounded-t-lg last:rounded-b-lg"
                        )
                    }>
                        {item.text}
                    </div>
                ))
            }
            </div>
        </div>
    )
}
