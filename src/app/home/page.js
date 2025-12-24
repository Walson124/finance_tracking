"use client"

import { Box } from "@mui/material";
import { useState } from "react";

export default function Home() {
    const [safeToSpend, setSafeToSpend] = useState('123.45');
    const [incomeThisMonth, setIncomeThisMonth] = useState('1234.56');
    const [spentThisMonth, setSpentThisMonth] = useState('888.88');
    const [billsDueSoon, setBillsDueSoon] = useState('3');

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
                                Safe-to-spend
                            </Box>
                        </Box>
                        <Box>
                            ${safeToSpend}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '70%',
                            }}
                        >
                            This week
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
                                Income
                            </Box>
                        </Box>
                        <Box>
                            ${incomeThisMonth}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '70%',
                            }}
                        >
                            This month
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
                                Spent
                            </Box>
                        </Box>
                        <Box>
                            ${spentThisMonth}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '70%',
                            }}
                        >
                            This month
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
                                Bills Due
                            </Box>
                        </Box>
                        <Box>
                            {billsDueSoon}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '70%',
                            }}
                        >
                            Next 7 days
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderRadius: '15px',
                        backgroundColor: 'rgb(20, 20, 20)',
                        width: '100%',
                        border: '0.5px solid rgb(66, 66, 66)',
                        height: '180px',
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
                                borderRadius: '10px',
                                backgroundColor: 'rgb(20, 20, 20)',
                                width: '100%',
                                border: '0.5px solid rgb(66, 66, 66)',
                                height: '130px'
                            }}
                        >
                            <Box
                                sx={{
                                    margin: '10px'
                                }}
                            >
                                
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