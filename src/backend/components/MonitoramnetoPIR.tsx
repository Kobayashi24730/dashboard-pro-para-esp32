'use client';
//import { useToast } from "@/backend/components/ui/sonner";
//import { useState } from "react";

export default function MonitoramentoPIR(){
    return (
        <div className="border border-gray-800 rounded-lg p-6 overflow-hidden">
            <table>
                <thead className="bg-gray-800 text-white ">
                    <tr className="">
                        <th>titulo</th>
                        <th>Mensagem</th>
                        <th>Estado</th>
                        <th>view</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-700 text-white">
                    <tr>
                        <td>Operacional</td>
                        <td>Ativo</td>
                        <td>Ativo</td>
                        <td><button className="bg-gray-800 text-white px-2 py-1 rounded cursor-pointer transition-colors hover:bg-gray-600">Ver</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
