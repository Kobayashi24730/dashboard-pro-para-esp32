import Card from "@/backend/components/Card";
export default function page() {
    return (
        <section className="space-y-6 ">
            <div>
                <h1>Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                    <Card color="indigo" />
                </div>
            </div>
        </section>
    )
}