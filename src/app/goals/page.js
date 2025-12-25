"use client"

import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { convertMonthIndex, generateRandomPastelColor } from "../utils";
import axios from "axios";

export default function Goals() {
    const [showCompleted, setShowCompleted] = useState(false);

    const [totalSaved, setTotalSaved] = useState(0);
    const [totalRemaining, setTotalRemaining] = useState(0);
    const [goals, setGoals] = useState([]);
    const [totalCompleted, setTotalCompleted] = useState(0);

    const [colors, setColors] = useState({});
    useEffect(() => {
        // Generate random pastel colors for each category on the client side
        const generatedColors = {};
        goals.forEach((goal) => {
            generatedColors[goal["name"]] = generateRandomPastelColor();
        });
        setColors(generatedColors);
    }, [goals]);

    useEffect(() => {
        let requestBody = {
            "user": "dev"
        }
        axios.post(
            '/api/proxy/goals/get_data',
            requestBody
        ).then((response) => {
            if (response.data) {
                let goal_data = response.data["goal_data"];
                var t_s = 0;
                var t_g = 0;
                var c = 0;
                for (let i = 0; i < goal_data.length; i++) {
                    let g = goal_data[i];
                    if (g["progress"] >= g["goal"])
                        c = c + 1;
                    else {
                        t_s = g["progress"] + t_s;
                        t_g = g["goal"] + t_g;
                    }
                }
                setTotalSaved(t_s);
                setTotalRemaining(t_g - t_s);
                setTotalCompleted(c);
                setGoals(goal_data);
            }
        }).catch((error) => {

        });
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                color: 'rgb(214, 214, 214)',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Box
                    sx={{
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
                                display: 'flex',
                                flexDirection: 'row',
                                gap: "15px",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "15%",
                                }}
                            >
                                <SavingsIcon
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    Total Saved
                                </Box>
                                <Box
                                    sx={{
                                        color: 'rgba(36, 255, 149, 1)',
                                        fontSize: "200%"
                                    }}
                                >
                                    ${totalSaved}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                borderRadius: '15px',
                                backgroundColor: 'rgb(20, 20, 20)',
                                padding: '10px',
                                width: '25%',
                                border: '0.5px solid rgb(66, 66, 66)',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: "15px",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "15%",
                                }}
                            >
                                <HourglassTopIcon
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    Total Remaining
                                </Box>
                                <Box
                                    sx={{
                                        color: 'rgba(255, 124, 126, 1)',
                                        fontSize: "200%"
                                    }}
                                >
                                    ${totalRemaining}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                borderRadius: '15px',
                                backgroundColor: 'rgb(20, 20, 20)',
                                padding: '10px',
                                width: '25%',
                                border: '0.5px solid rgb(66, 66, 66)',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: "15px",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "15%",
                                }}
                            >
                                <TrackChangesIcon
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    Goals Set
                                </Box>
                                <Box
                                    sx={{
                                        color: 'rgba(36, 178, 255, 1)',
                                        fontSize: "200%"
                                    }}
                                >
                                    {goals.length - totalCompleted}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            onClick={() => setShowCompleted(!showCompleted)}
                            sx={{
                                borderRadius: '15px',
                                backgroundColor: 'rgb(20, 20, 20)',
                                padding: '10px',
                                width: '25%',
                                border: '0.5px solid rgb(66, 66, 66)',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: "15px",
                                cursor: "pointer",
                                ":hover": {
                                    backgroundColor: 'rgba(255, 237, 98, 0.33)'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "15%",
                                }}
                            >
                                <CheckCircleIcon
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    Goals Completed
                                </Box>
                                <Box
                                    sx={{
                                        color: showCompleted ? 'rgba(255, 237, 98, 1)' : 'gray',
                                        fontSize: "200%",
                                    }}
                                >
                                    {totalCompleted}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* GOALS MAPPED HERE */}
            <Box>
                {goals.map((goal, index) => {
                    if (showCompleted || (goal["goal"] > goal["progress"]))
                        return (
                            <Box
                                key={index}
                                sx={{
                                    borderRadius: '15px',
                                    backgroundColor: 'rgb(20, 20, 20)',
                                    padding: '10px',
                                    border: '0.5px solid rgb(66, 66, 66)',
                                    mb: "10px",
                                    fontSize: "150%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexGrow: 9
                                        }}
                                    >
                                        <Box>
                                            {goal["name"]}
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                width: "100%",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    minWidth: '220px'
                                                }}
                                            >
                                                ${goal["progress"]} / ${goal["goal"]}
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "calc(100% - 200px - 220px)",
                                                    mr: "40px",
                                                }}
                                            >
                                                <Box sx={{ width: "100%" }}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={Math.min(100, (goal.progress / goal.goal) * 100)}
                                                        sx={{
                                                            mt: '5px',
                                                            height: 20,
                                                            borderRadius: 999,
                                                            backgroundColor: "rgba(255,255,255,0.08)",
                                                            "& .MuiLinearProgress-bar": {
                                                                borderRadius: 999,
                                                                backgroundColor: colors[goal["name"]] || "blue",
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                    width: "200px",
                                                }}
                                            >
                                                ${goal["monthly"]} monthly
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            mr: '10px',
                                            mt: '10px',
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                        >
                                            Save More
                                        </Button>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexGrow: 9
                                        }}
                                    >
                                        {convertMonthIndex(goal["target_month"])} {goal["target_year"]}
                                    </Box>
                                    <Box>
                                        {`${Math.max(0, (goal.target_year - new Date().getFullYear()) * 12 + (goal.target_month - new Date().getMonth()))} mo • $${Math.max(0, goal.goal - goal.progress).toLocaleString()} left`}
                                    </Box>

                                </Box>
                            </Box>
                        )
                })}
            </Box>
        </Box>
    )
}