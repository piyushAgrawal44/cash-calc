import React from 'react';
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJs } from 'chart.js/auto';
export default function TransactionChart({Data,Lables}) {
    
    Lables.sort();
   

    const ChartData={
        labels: Lables,
        datasets: [
            {
                label: "Total Transaction ",
                data: Data,
                border:false,
                fill: false,
                borderColor: "#000000",
                tension: 0.2,
                backgroundColor: ['#FF7B95', '#A6ABBD', '#8BEE86', '#656DC8', '#FFEECA','#FFEECA'],
            }
        ]
    }


    return (
        <>
            <div className="ChartDiv">
                <Line 
                    data={ChartData} options={
                        {
                            responsive: true,
                            plugins: {
                                title: {
                                    display: false,
                                },
                                legend: {
                                    display: false
                                }
                            },
                            animation: {
                                duration: 3000,
                                easing: 'easeOutBounce',
                            },
                        }
                    }
                />
                </div>
        </>
    )
}
