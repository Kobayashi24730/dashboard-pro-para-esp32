import Card from "@/backend/components/Card";
//import { data } from "@/backend/data/useTextValues";

async function getValues() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/data/movimento`,
        {
            cache: "no-store"
        });
    return response.json();
}

export default async  function page() {
    const data: any[] = await getValues();
    const data_sound = data.filter((item) => item.device_id === "ESP32_SOUND_01");
    const data_pir = data.filter((item) => item.device_id === "ESP32_PIR_01");
    const data_humid = data.filter((item) => item.device_id === "ESP32_HUMID_01");
    const data_temp = data.filter((item) => item.device_id === "ESP32_TEMP_01");
    const data_ultra = data.filter((item) => item.device_id === "ESP32_ULTRA_01");
    const formataDadosGraficos = (dados: any[])=> {
        return dados.map((item) => ({
            createdAt: new Date(item.createdAt || Date.now()).toLocaleTimeString("pt-BR",{ hour: '2-digit', minute: '2-digit' }),
            name: item.device_id,
            valor: item.valor != null ? Number(item.valor) : Number(item.estado)
        }));
    }


    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {data_sound.length > 0 &&
                <Card themeColor="verde" title="Receita Operational" values={formataDadosGraficos(data_sound)} bestValue={1000}/>
            }
            {data_pir.length > 0 &&
                <Card themeColor="roxo" title="Receita Operational" values={formataDadosGraficos(data_pir)} bestValue={1000}/>
            }
            {data_humid.length > 0 &&
                <Card themeColor="azul" title="Receita Operational" values={formataDadosGraficos(data_humid)} bestValue={1000}/>
            }
            {data_temp.length > 0 &&
                <Card themeColor="vermelho" title="Receita Operational" values={formataDadosGraficos(data_temp)} bestValue={1000}/>
            }
            {data_ultra.length > 0 &&
                <Card themeColor="verde" title="Receita Operational" values={formataDadosGraficos(data_ultra)} bestValue={1000}/>
            }
        </section>
    )
}