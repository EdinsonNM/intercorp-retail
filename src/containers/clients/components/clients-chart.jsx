import React from 'react';
import { BarChart, Tooltip, CartesianGrid, Bar, ResponsiveContainer , XAxis} from 'recharts';
import '../styles/clients-chart.scss';
import CustomerAnalysis from '../../../libs/CustomerAnalysis';

export default function ClientsChart({ data }) {
    const isResponsive = window.matchMedia('(max-width: 480px)').matches;
    const results = CustomerAnalysis.getAnalysis(data.map(client=> client.age))
    return data.length ? (
        <div className="clients-chart" id="chart" style={{ margin: 'auto' }}>
            <ResponsiveContainer width={isResponsive ? 320 : 420} height={160}>
                <BarChart
                    width={isResponsive ? 320 : 420}
                    height={160}
                    data={data}
                    margin={{
                        top: 20,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fullname" hide/>
                    <Tooltip />
                    <Bar dataKey="age" fill="#0099cc" />
                </BarChart>
            </ResponsiveContainer>
            <div className="clients-chart__info">
                <div className="clients-chart__info__label">
                    <label>Desviación Estandar</label> : {results.standardDeviation}
                </div>
                <div className="clients-chart__info__label">
                    <label>Edad Promedio</label> : {results.averageAge}
                </div>
            </div>
        </div>
    ) : (
        <div />
    );
}
