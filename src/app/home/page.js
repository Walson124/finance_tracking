"use client"

import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import { convertMonthIndex } from "../utils";

export default function Home() {
    /**
        burn_rate_3m,
        burn_rate_last_month,
        income_avg_3m,
        income_last_month,
        income_mom_delta,
        income_mom_pct,
        income_total_12m,
        net_avg_3m,
        net_last_month,
        net_mom_delta,
        net_mom_pct,
        net_total_12m,
        savings_rate_3m,
        savings_rate_last_month,
        spent_avg_3m,
        spent_last_month,
        spent_mom_delta,
        spent_mom_pct,
        spent_total_12m,
     */
    const [widgetData, setWidgetData] = useState({});
    const [widgetsUsed, setWidgetsUsed] = useState([
        { "name": "income_total_12m", "val": widgetData["income_total_12m"] || "--", "unit": "This year", "prepend": "$" },
        { "name": "spent_total_12m", "val": widgetData["spent_total_12m"] || "--", "unit": "This year", "prepend": "$" },
        { "name": "net_total_12m", "val": widgetData["net_total_12m"] || "--", "unit": "This year", "prepend": "$" },
        { "name": "burn_rate_3m", "val": ((widgetData["burn_rate_3m"] || 0) * 100).toFixed(2), "unit": "This month", "prepend": "%" },
    ]);

    const [months, setMonths] = useState([]); // e.g. ["Jan 2025", ...]
    const [income, setIncome] = useState([]);
    const [spent, setSpent] = useState([]);

    useEffect(() => {
        const now = new Date();

        // oldest -> newest (last 12 months)
        const last12 = Array.from({ length: 12 }, (_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
            let tempMonth = d.getMonth();
            return {
                label: d.toLocaleString("en-US", { month: "short" }),
                fullMonth: convertMonthIndex(tempMonth + 1),
                monthIndex: tempMonth,
                year: d.getFullYear(),
                key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
            };
        });

        setMonths(last12.map((x) => x.label));

        // placeholder data (replace with API results)
        setIncome(Array.from({ length: 12 }, () => 0));
        setSpent(Array.from({ length: 12 }, () => 0));

        let requestBody = {
            "last12": last12
        }
        axios.post(
            '/api/proxy/home/get_data',
            requestBody
        ).then((response) => {
            if (response.data) {
                console.log(response.data);
                // widget data
                let widget_data = response.data["widgets"];
                setWidgetData(widget_data);
                // console.log(widget_data);
                // cashflow data
                let cashflow_data = response.data["cashflow"];
                setIncome(cashflow_data["income"]);
                setSpent(cashflow_data["spent"]);
            }
        }).catch((error) => {

        });
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                color: 'rgb(214, 214, 214)',
            }}
        >
            <Box
                sx={{
                    // width: '70%',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        minHeight: '80px',
                        gap: '10px',
                        marginBottom: '10px',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: '15px',
                            backgroundColor: 'rgb(20, 20, 20)',
                            padding: '10px',
                            width: '25%',
                            border: '0.5px solid rgb(66, 66, 66)',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0.3rem',
                                marginBottom: '0.3rem',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(36, 178, 255, 1)',
                                    height: '1.5rem',
                                    width: '1.5rem',
                                    borderRadius: '0.5rem',
                                }}
                            />
                            <Box>
                                {widgetsUsed[0]["name"]}
                            </Box>
                        </Box>
                        <Box>
                            {widgetsUsed[0]["prepend"]}{widgetsUsed[0]["val"]}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '70%',
                            }}
                        >
                            {widgetsUsed[0]["unit"]}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            borderRadius: '15px',
                            backgroundColor: 'rgb(20, 20, 20)',
                            padding: '10px',
                            width: '25%',
                            border: '0.5px solid rgb(66, 66, 66)',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0.3rem',
                                marginBottom: '0.3rem',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(36, 255, 149, 1)',
                                    height: '1.5rem',
                                    width: '1.5rem',
                                    borderRadius: '0.5rem',
                                }}
                            />
                            <Box>
                                {widgetsUsed[1]["name"]}
                            </Box>
                        </Box>
                        <Box>
                            {widgetsUsed[1]["prepend"]}{widgetsUsed[1]["val"]}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '70%',
                            }}
                        >
                            {widgetsUsed[1]["unit"]}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            borderRadius: '15px',
                            backgroundColor: 'rgb(20, 20, 20)',
                            padding: '10px',
                            width: '25%',
                            border: '0.5px solid rgb(66, 66, 66)',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0.3rem',
                                marginBottom: '0.3rem',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(255, 124, 126, 1)',
                                    height: '1.5rem',
                                    width: '1.5rem',
                                    borderRadius: '0.5rem',
                                }}
                            />
                            <Box>
                                {widgetsUsed[2]["name"]}
                            </Box>
                        </Box>
                        <Box>
                            {widgetsUsed[2]["prepend"]}{widgetsUsed[2]["val"]}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '70%',
                            }}
                        >
                            {widgetsUsed[2]["unit"]}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            borderRadius: '15px',
                            backgroundColor: 'rgb(20, 20, 20)',
                            padding: '10px',
                            width: '25%',
                            border: '0.5px solid rgb(66, 66, 66)',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0.3rem',
                                marginBottom: '0.3rem',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(255, 237, 98, 1)',
                                    height: '1.5rem',
                                    width: '1.5rem',
                                    borderRadius: '0.5rem',
                                }}
                            />
                            <Box>
                                {widgetsUsed[3]["name"]}
                            </Box>
                        </Box>
                        <Box>
                            {widgetsUsed[3]["prepend"]}{widgetsUsed[3]["val"]}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '70%',
                            }}
                        >
                            {widgetsUsed[3]["unit"]}
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderRadius: '15px',
                        backgroundColor: 'rgb(20, 20, 20)',
                        width: '100%',
                        border: '0.5px solid rgb(66, 66, 66)',
                        mb: '10px',
                    }}
                >
                    <Box
                        sx={{
                            margin: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                mb: '10px',
                            }}
                        >
                            Cashflow
                        </Box>
                        <Box
                            sx={{
                                borderRadius: "10px",
                                // backgroundColor: "rgb(20, 20, 20)",
                                backgroundColor: 'white',
                                width: "100%",
                                minHeight: 200,
                                border: "0.5px solid rgb(66, 66, 66)",
                                p: 1.25,
                                boxSizing: "border-box",
                            }}
                        >
                            <Box sx={{ width: "100%", height: "100%" }}>
                                <LineChart
                                    height={250}
                                    xAxis={[{ data: months, scaleType: "point" }]}
                                    series={[
                                        { data: income, label: "Income" },
                                        { data: spent, label: "Spent" },
                                    ]}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderRadius: '15px',
                        backgroundColor: 'rgb(20, 20, 20)',
                        width: '100%',
                        border: '0.5px solid rgb(66, 66, 66)',
                    }}
                >
                    <Box
                        sx={{
                            margin: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                mb: '10px',
                            }}
                        >
                            Recents
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* <Box
                sx={{
                    width: '30%',
                }}
            >
                <Box>
                    Budgets
                </Box>
                <Box>
                    Goals
                </Box>
                <Box>
                    Insights
                </Box>
            </Box> */}
        </Box>
    )
}