import {useRef} from "react";

import {NavLink, useParams} from "react-router";
import {cn} from "@/lib/utils.ts";
import {
    AddressBookIcon,
    AddressBookTabsIcon, ArrowUDownLeftIcon,
    BuildingApartmentIcon, ChatCenteredDotsIcon,
    ChatsCircleIcon, HeadsetIcon, KeyIcon,
    PersonIcon, RobotIcon, TagIcon, TreeStructureIcon,
    UsersThreeIcon
} from "@phosphor-icons/react";

import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {SearchInput} from "@/components/custom/search-input.tsx";

export type SettingOptions =
    "usuarios" |
    "setores" |
    "canais-de-comunicacao" |
    "clientes" |
    "contatos" |
    "grupos-de-contatos" |
    "mensagens-padrao" |
    "etiquetas" |
    "tipos-de-atendimento" |
    "workflows" |
    "token-ia" |
    "atendimento-automatico" |
    "configuracoes-de-redirecionamento";

export function SettingsList() {
    const params = useParams() as {setting?: string};
    const hasSetting = !!params.setting;

    const ref = useRef<HTMLDivElement | null>(null);

    const settings = [
        {
            label: 'Sistema',
            children: [
                {
                    label: 'Usuários',
                    Icon: UsersThreeIcon,
                    to: 'usuarios',
                },
                {
                    label: 'Setores',
                    Icon: BuildingApartmentIcon,
                    to: 'setores',
                },
                {
                    label: 'Canais de comunicação',
                    Icon: ChatsCircleIcon,
                    to: 'canais-de-comunicacao',
                }
            ]
        },
        {
            label: "Recursos da empresa",
            children: [
                {
                    label: 'Clientes',
                    Icon: PersonIcon,
                    to: 'clientes',
                },
                {
                    label: 'Contatos',
                    Icon: AddressBookIcon,
                    to: 'contatos',
                },
                {
                    label: 'Grupos de contatos',
                    Icon: AddressBookTabsIcon,
                    to: 'grupos-de-contatos',
                },
            ]
        },
        {
                    label: "Atendimentos",
                    children: [
                        {
                            label: 'Mensagens padrão',
                            Icon: ChatCenteredDotsIcon,
                            to: 'mensagens-padrao',
                        },
                        {
                            label: 'Etiquetas',
                            Icon: TagIcon,
                            to: 'etiquetas',
                        },
                        {
                            label: 'Tipos de atendimento',
                            Icon: HeadsetIcon,
                            to: 'tipos-de-atendimento',
                        },
                        {
                            label: 'Workflows',
                            Icon: TreeStructureIcon,
                            to: 'workflows',
                        },
                    ]
                },
        {
                    label: "Inteligência Artificial",
                    children: [
                        {
                            label: 'Token IA',
                            Icon: KeyIcon,
                            to: 'token-ia',
                        },
                        {
                            label: 'Atendimento automático',
                            Icon: RobotIcon,
                            to: 'atendimento-automatico',
                        },
                        {
                            label: 'Configurações de redirecionamento',
                            Icon: ArrowUDownLeftIcon,
                            to: 'configuracoes-de-redirecionamento',
                        },
                    ]
                },
    ]


    return(
        <div className={
            cn("bg-side-content border-r",
                "grid grid-rows-[60px_auto_minmax(0,1fr)] h-full min-h-0 overflow-hidden",
                hasSetting && "max-md:hidden" // Hide on small screens if setting is present
            )
        }>
            <div className="flex flex-row items-center px-4 justify-between">
                <span className="text-sm font-medium">Configurações</span>

            </div>
            <div className="flex justify-center items-center px-4 pb-2">
               <SearchInput />
            </div>

            <ScrollArea viewportRef={ref} className="overflow-y-auto h-full min-h-0 max-h-full relative">
                <div className="flex flex-col gap-6 px-4 pt-2 pb-10">
                    {
                        settings.map((menu, index) => {

                            return (
                                <div key={index} className="flex flex-col gap-3">
                                    <span className="text-sm font-medium pl-2">{menu.label}</span>
                                    <div className="bg-muted-foreground/10 rounded-xl overflow-clip">
                                    {
                                        menu.children.map((item, i) => {
                                            const Icon = item.Icon;
                                            const isActive = params.setting === item.to;
                                            return (
                                                <NavLink key={i} to={{pathname: item.to}}
                                                         className={
                                                    cn(
                                                        "grid grid-cols-[24px_1fr] items-center gap-2 p-3 hover:bg-foreground/5 not-last:border-b",
                                                        isActive && 'bg-primary text-white hover:bg-primary',
                                                    )
                                                         }>
                                                    <Icon className="size-5" />
                                                    <span className="text-sm line-clamp-1">
                                                        {item.label}
                                                    </span>
                                                </NavLink>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </ScrollArea>
        </div>
    )
}
