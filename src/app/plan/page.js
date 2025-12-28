"use client"

import { Box, Button, Divider, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { generateRandomPastelColor, MONTHS_STR } from "../utils";

export default function Plan() {
    const [colors, setColors] = useState({});
    const [categories, setCategories] = useState({
        "Groceries": 0,
        "Dining": 0,
        "Transport": 0,
        "Bills": 0,
        "Fun": 0,
        "Other": 0
    });
    const [usage, setUsage] = useState({
        "Groceries": 100,
        "Amazon": 50,
    });

    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        // Generate random pastel colors for each category on the client side
        const generatedColors = {};
        Object.keys(categories).forEach((category) => {
            generatedColors[category] = generateRandomPastelColor();
        });
        setColors(generatedColors);
    }, [categories]);

    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    borderRadius: "15px",
                    minHeight: "20px",
                    p: '10px',
                    backgroundColor: "rgb(20, 20, 20)",
                    color: "rgb(214, 214, 214)",
                    border: "0.5px solid rgb(66, 66, 66)",
                    alignItems: "center",
                    mb: '15px',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexGrow: 1,
                        alignItems: 'center',
                        gap: '15px',
                    }}
                >
                    <Box>
                        Month
                    </Box>
                    <Box>
                        <TextField
                            label="Month"
                            onChange={(e) => setMonth(e.target.value)}
                            size="small"
                            select
                            sx={{
                                width: 110,
                                backgroundColor: "white",
                                borderRadius: "5px",
                                // label when shrunk (floating)
                                "& .MuiInputLabel-root.MuiInputLabel-shrink": { color: "transparent" },

                                // text shown inside the select
                                "& .MuiSelect-select": {
                                    fontSize: "0.8rem",
                                    py: 0.5,
                                    px: 1,
                                    display: "flex",
                                    alignItems: "center",
                                },

                                // label ("Month")
                                "& .MuiInputLabel-root": {
                                    fontSize: "0.8rem",
                                },

                                // dropdown arrow icon
                                "& .MuiSvgIcon-root": {
                                    fontSize: "1.1rem",
                                },
                            }}
                        >
                            <MenuItem value={""} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }} />
                            {MONTHS_STR.map((m) => (
                                <MenuItem key={m} value={m} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }}>
                                    {m}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box>
                        <TextField
                            label="Year"
                            onChange={(e) => setYear(e.target.value)}
                            size="small"
                            select
                            sx={{
                                width: 110,
                                backgroundColor: "white",
                                borderRadius: "5px",
                                // label when shrunk (floating)
                                "& .MuiInputLabel-root.MuiInputLabel-shrink": { color: "transparent" },

                                // text shown inside the select
                                "& .MuiSelect-select": {
                                    fontSize: "0.8rem",
                                    py: 0.5,
                                    px: 1,
                                    display: "flex",
                                    alignItems: "center",
                                },

                                // label ("Month")
                                "& .MuiInputLabel-root": {
                                    fontSize: "0.8rem",
                                },

                                // dropdown arrow icon
                                "& .MuiSvgIcon-root": {
                                    fontSize: "1.1rem",
                                },
                            }}
                        >
                            <MenuItem value={""} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }} />
                            {Array.from({ length: 2030 - 2020 + 1 }, (_, i) => 2030 - i).map((year) => (
                                <MenuItem key={year} value={year} sx={{ fontSize: "0.8rem", minHeight: 28, py: 0.25 }}>
                                    {year}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        sx={{
                            mr: '10px',
                        }}
                        size="small"
                        variant="contained"
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: {'lg': 'flex', 'xs': 'block'},
                    flexDirection: 'row',
                    gap: '15px',
                }}
            >
                <Box
                    sx={{
                        // flexGrow: 1,
                        borderRadius: "15px",
                        minHeight: "20px",
                        p: '10px',
                        backgroundColor: "rgb(20, 20, 20)",
                        color: "rgb(214, 214, 214)",
                        border: "0.5px solid rgb(66, 66, 66)",
                        alignItems: "center",
                        mb: {'lg': 0, 'xs': '15px' }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Box
                            sx={{
                                minWidth: '200px',
                            }}
                        >
                            Budgets (this month)
                        </Box>
                        <Box
                            sx={{
                                width: '200px'
                            }}
                        >
                            Allocated Budget
                        </Box>
                        <Box>
                            Usage
                        </Box>
                    </Box>
                    <Divider
                        sx={{
                            backgroundColor: 'rgb(66, 66, 66)',
                            my: 1,
                            width: 'calc(100% + 20px)',
                            ml: '-10px',
                        }}
                    />
                    {Object.keys(categories).map((category, index) => (
                        <Box
                            key={index}
                            sx={{
                                mt: index != 0 ? '10px' : '0px',
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '5px',
                                    minWidth: '200px',
                                }}
                            >
                                <Box
                                    sx={{
                                        borderRadius: '3px',
                                        backgroundColor: colors[category] || 'white',
                                        height: '1.3rem',
                                        width: '1.3rem',
                                    }}
                                />
                                <Box>
                                    {category}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '200px'
                                }}
                            >
                                <TextField
                                    onChange={(event) => {
                                        const v = event.target.value;
                                        setCategories((prev) => ({
                                            ...prev,
                                            [category]: v,
                                        }));
                                    }}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '5px',
                                        width: '110px',
                                        "& .MuiInputBase-input": {
                                            py: 0.25,  // vertical padding (default ~8px)
                                            px: 0.75,  // horizontal padding
                                            fontSize: "0.9rem",
                                        },
                                    }}
                                    defaultValue={categories[category]}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: '200px'
                                }}
                            >
                                {usage[category] || ""} | {categories[category] != 0 ? (usage[category] ? (usage[category] * 100.0 / categories[category]).toFixed(2) : 0) : "--"}%
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        flexGrow: 2,
                        borderRadius: "15px",
                        minHeight: "20px",
                        p: '10px',
                        backgroundColor: "rgb(20, 20, 20)",
                        color: "rgb(214, 214, 214)",
                        border: "0.5px solid rgb(66, 66, 66)",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        Mandatory Expenses
                    </Box>
                    <Divider
                        sx={{
                            backgroundColor: 'rgb(66, 66, 66)',
                            my: 1,
                            width: 'calc(100% + 20px)',
                            ml: '-10px',
                        }}
                    />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        height: '100%'
                    }}>
                        {/* <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ 
                                mx: 1, 
                                borderColor: "rgba(0,0,0,0.3)",
                                height: '100%',
                            }}
                        /> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}