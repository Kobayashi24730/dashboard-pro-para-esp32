import Card from "@/backend/components/Card";
//import { data } from "@/backend/data/useTextValues";

async function getValues() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/data/movimento`,
        {
            cache: "no-store"
        });
    return response.json();
}

export default function page() {
    const data = getValues();
    return (
        <section className="space-y-6 ">
            <div>
                <h1>Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                    <Card themeColor="indigo" title="Receita Operational" values={data} bestValue={1000}/>
                </div>
            </div>
        </section>
    )
}