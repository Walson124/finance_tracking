"use client"

import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const widgetsUsed = [
        { name: "Income", val: widgetData["income_total_12m"] ? widgetData["income_total_12m"].toFixed(2) : "--", unit: "This year", prepend: "$", color: "rgba(36, 178, 255, 1)" },
        { name: "Spent", val: widgetData["spent_total_12m"] ? widgetData["spent_total_12m"].toFixed(2) : "--", unit: "This year", prepend: "$", color: "rgba(36, 255, 149, 1)" },
        { name: "Net Change", val: widgetData["net_total_12m"] ? widgetData["net_total_12m"].toFixed(2) : "--", unit: "This year", prepend: "$", color: "rgba(255, 124, 126, 1)" },
        { name: "Burn Rate", val: widgetData["burn_rate_3m"] ? (widgetData["burn_rate_3m"] * 100).toFixed(2) : "--", unit: "Last 3 months", prepend: "%", color: "rgba(255, 237, 98, 1)" },
    ];

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
        axios.post('/api/proxy/home/get_data', requestBody)
            .then((response) => {
                if (response.data) {
                    setWidgetData(response.data["widgets"] || {});
                    const cashflow = response.data["cashflow"] || {};
                    setIncome(cashflow["income"] || Array(12).fill(0));
                    setSpent(cashflow["spent"] || Array(12).fill(0));
                }
            })
            .catch(() => setError("Failed to load dashboard data."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', color: 'rgb(214, 214, 214)' }}>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="error" onClose={() => setError("")}>{error}</Alert>
            </Snackbar>
            <Box sx={{ width: '100%' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress sx={{ color: 'rgb(214, 214, 214)' }} />
                    </Box>
                ) : (
                <>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        minHeight: '80px',
                        gap: '10px',
                        marginBottom: '10px',
                        width: '100%',
                        flexWrap: 'wrap',
                    }}
                >
                    {widgetsUsed.map((w) => (
                        <Box
                            key={w.name}
                            sx={{
                                borderRadius: '15px',
                                backgroundColor: 'rgb(20, 20, 20)',
                                padding: '10px',
                                flexGrow: 1,
                                maxWidth: '25%',
                                minWidth: '100px',
                                border: '0.5px solid rgb(66, 66, 66)',
                            }}
                        >
                            <Box sx={{ fontSize: '70%', display: 'flex', flexDirection: 'row', gap: '0.3rem', marginBottom: '0.3rem' }}>
                                <Box sx={{ backgroundColor: w.color, height: '1.5rem', width: '1.5rem', borderRadius: '0.5rem' }} />
                                <Box>{w.name}</Box>
                            </Box>
                            <Box>{w.prepend}{w.val}</Box>
                            <Box sx={{ fontSize: '70%' }}>{w.unit}</Box>
                        </Box>
                    ))}
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
                <Box sx={{ borderRadius: '15px', backgroundColor: 'rgb(20, 20, 20)', width: '100%', border: '0.5px solid rgb(66, 66, 66)' }}>
                    <Box sx={{ margin: '10px' }}>
                        <Box sx={{ mb: '10px' }}>Recents</Box>
                    </Box>
                </Box>
                </>
                )}
            </Box>
        </Box>
    )
}