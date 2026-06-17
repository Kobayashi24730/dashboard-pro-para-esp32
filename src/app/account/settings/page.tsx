'use client';
import {useState} from "react";

interface dataType {
    id: number;
    name: string;
    inputs: Record<string, string>;
    description: string;
    icon: string;
}
const data = [
    {
        id: 1,
        name: "Geral",
        inputs: {
            'name': 'name',
            'email': 'email',
            'password': 'password'
        },
        description: "Configurações gerais",
        icon: ""
    }
];

const category = [ 'geral', 'seguranca', 'notificacoes', 'ajuda' ];
export default function settings(){
    const [selectyCategory, setSelectCategory] = useState('geral');
    const serch = data.filter((item) => {
        const mathItem = item.name.toLowerCase().includes(selectyCategory.toLowerCase()) ||
            item.description.toLowerCase().includes(selectyCategory.toLowerCase());
        return mathItem;
    });
    return(
        <section>
            <div>
                <h1>Configurações</h1>
            </div>
        </section>
    );
}