export function formatTime(dateStr?: string) {
        if (!dateStr) return "Agora";
        try {
            const date = new Date(dateStr.replace(" ", "T"));
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);

            if (diffMins < 1) return "Agora";
            if (diffMins < 60) return `${diffMins}min atrás`;
            if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h atrás`;
            return date.toLocaleDateString("pt-BR");
        } catch {
            return "Agora";
        }
    };