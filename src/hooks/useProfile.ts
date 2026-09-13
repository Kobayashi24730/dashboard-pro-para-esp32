'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useProfile() {
    const { data: session, update } = useSession();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [prev, setPrev] = useState<any>(null);

    if (session?.user && session.user !== prev) {
        setPrev(session.user);
        setEmail(session.user.email || "");
        setNome(session.user.name || "");
    }

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/user/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, nome })
            });
            const resData = await response.json();
            if (!response) throw new Error("Erro ao salvar configurações.");
            const newSession = await update({
                name: nome,
                email: email,
                user: {
                    name: nome,
                    email: email
                }
            });

            // 3. Garante que os estados locais reflitam o novo nome imediatamente
            if (newSession?.user) {
                setNome(newSession.user.name || nome);
                setEmail(newSession.user.email || email);
                setPrev(newSession.user);
            }
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
         setError(err.message || "Ocorreu um erro ao salvar.");   
        } finally {
            setLoading(false);
        }
    };

    return {
        session,
        nome,
        setNome,
        email,
        setEmail,
        loading,
        success,
        error,
        handleSave
    };
}