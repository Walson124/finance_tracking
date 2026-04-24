"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    Stack,
} from "@mui/material";
import { darkFieldSx } from "../utils";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.error || "Login failed");
            }

            const next =
                new URLSearchParams(window.location.search).get("next") || "/home";

            router.replace(next);
            router.refresh();
        } catch (err) {
            setError(err.message || "Login failed");
            setSubmitting(false);
        }
    }

    return (
        <Box
            sx={{
                display: "grid",
                placeItems: "center",
                p: 2,
            }}
        >
            <Paper
                sx={{
                    p: 3,
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: "18px",
                    backgroundColor: "rgb(14, 14, 14)",
                    border: "0.5px solid rgb(66, 66, 66)",
                    color: "rgb(214, 214, 214)",
                }}
            >
                <Typography variant="h5" sx={{ mb: 0.5 }}>
                    Welcome back
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                    Log in to continue
                </Typography>

                <Box component="form" onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        {error ? (
                            <Alert
                                severity="error"
                                sx={{
                                    borderRadius: "12px",
                                    backgroundColor: "rgba(255,0,0,0.08)",
                                    color: "rgb(214,214,214)",
                                }}
                            >
                                {error}
                            </Alert>
                        ) : null}

                        <TextField
                            label="Email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            sx={darkFieldSx}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            sx={darkFieldSx}
                        />

                        <Button
                            type="submit"
                            disabled={submitting}
                            fullWidth
                            sx={{
                                py: 1.2,
                                borderRadius: "15px",
                                textTransform: "none",
                                backgroundColor: "rgb(40, 40, 40)",
                                border: "0.5px solid rgb(66, 66, 66)",
                                color: "rgb(214, 214, 214)",
                                "&:hover": { backgroundColor: "rgb(55, 55, 55)" },
                            }}
                        >
                            {submitting ? "Logging in..." : "Log in"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}
