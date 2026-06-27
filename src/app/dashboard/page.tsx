'use client';

import Card from "@/backend/components/Card";
import MonitoramentoPIR from "@/backend/components/MonitoramnetoPIR";
import getValues from "@/backend/data/useTextValues";
import { useState, useEffect } from "react";
import { Users, Zap, Wifi, Thermometer, TrendingUp, Calendar } from "lucide-react";

interface SensorData {
    device_id: string;
    sensor: string;
    estado: boolean;
    valor?: number;
    name?: string;
}

export default function Dashboard() {
    const [data, setData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const arrayData = await getValues();
                setData(arrayData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter data by sensor type
    const data_temp = data.filter((item: any) => item.sensor === "Temperatura");
    const data_humid = data.filter((item: any) => item.sensor === "Umidade");
    const data_sound = data.filter((item: any) => item.sensor === "Som");
    const data_pir = data.filter((item: any) => item.sensor === "PIR");

    const formataDadosGraficos = (dados: SensorData[]) => {
        return dados.slice(-10).map((item) => ({
            ...item,
            valor: item.valor || 0,
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 space-y-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 rounded-xl p-8 md:p-12 text-white shadow-md">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Dashboard</h1>
                        <p className="text-blue-100 text-lg">Monitor your ESP32 sensors in real-time</p>
                    </div>
                    <div className="hidden md:block text-6xl opacity-20">📊</div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Active Devices */}
                <div className="fluent-card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-600">Active Devices</h3>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Wifi className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{data.length}</p>
                    <p className="text-xs text-gray-500 mt-2">Devices online</p>
                </div>

                {/* Temperature */}
                <div className="fluent-card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-600">Temperature</h3>
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Thermometer className="w-5 h-5 text-orange-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        {data_temp.length > 0 ? data_temp[data_temp.length - 1].valor?.toFixed(1) : '0'}°C
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Current reading</p>
                </div>

                {/* Humidity */}
                <div className="fluent-card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-600">Humidity</h3>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Zap className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        {data_humid.length > 0 ? data_humid[data_humid.length - 1].valor?.toFixed(1) : '0'}%
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Current reading</p>
                </div>

                {/* PIR Events */}
                <div className="fluent-card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-600">PIR Events</h3>
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{data_pir.length}</p>
                    <p className="text-xs text-gray-500 mt-2">Detected today</p>
                </div>
            </div>

            {/* Sensor Cards Grid */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sensor Readings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data_temp.length > 0 && (
                        <Card themeColor="vermelho" title="Temperature Sensor" values={formataDadosGraficos(data_temp)} bestValue={50}/>
                    )}
                    {data_humid.length > 0 && (
                        <Card themeColor="azul" title="Humidity Sensor" values={formataDadosGraficos(data_humid)} bestValue={100}/>
                    )}
                    {data_sound.length > 0 && (
                        <Card themeColor="cyan" title="Sound Sensor" values={formataDadosGraficos(data_sound)} bestValue={1000}/>
                    )}
                    {data_pir.length > 0 && (
                        <Card themeColor="fuchsia" title="PIR Sensor" values={formataDadosGraficos(data_pir)} bestValue={1000}/>
                    )}
                </div>
            </div>

            {/* PIR Monitoring Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">PIR Monitoring</h2>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                        View All
                    </button>
                </div>
                <div className="fluent-card">
                    <MonitoramentoPIR values={data_pir} />
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-3">
                    {data.slice(-5).map((item, index) => (
                        <div key={index} className="fluent-card flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div>
                                    <p className="font-medium text-gray-900">{item.sensor}</p>
                                    <p className="text-xs text-gray-500">{item.device_id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">{item.valor?.toFixed(2) || 'N/A'}</p>
                                <p className="text-xs text-gray-500">Just now</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
