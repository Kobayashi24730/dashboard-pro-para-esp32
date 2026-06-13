import Card from "@/backend/components/Card";
import { data } from "@/backend/data/useTextValues";

export default function page() {
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