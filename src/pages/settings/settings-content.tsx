import {useParams} from "react-router";
import type {SettingOptions} from "@/pages/settings/settings-list.tsx";
import { cn } from "@/lib/utils";
import {useMemo} from "react";
import {UsersTab} from "@/pages/settings/setting-tabs/users-tab/users-tab.tsx";

export function SettingsContent() {

    const params = useParams() as { setting: SettingOptions}
    const hasSetting = !!params.setting;

    const renderSettingComponent = useMemo(() => {
        switch (params.setting) {
            case "usuarios":
                return <UsersTab />
            default:
                return <div className="text-muted-foreground">Configuração não encontrada.</div>;
        }
    }, [params.setting]);

    if (!params.setting) {
        return (
            <div className={
                cn(
                    "bg-chat text-center text-muted-foreground w-full h-full flex items-center justify-center",
                    !hasSetting && "max-md:hidden",
                )
            }>
                Selecione uma configuração no menu à esquerda.
            </div>
        )
    }

    return renderSettingComponent
}
