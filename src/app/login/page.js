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
            const res = await fetch("/api/proxy/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || "Login failed");
            }

            router.replace("/home");
            router.refresh();
        } catch (err) {
            setError(err.message || "Login failed");
            setSubmitting(false);
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                p: 2,
            }}
        >
            <Paper sx={{ p: 3, width: "100%", maxWidth: 420 }}>
                <Typography variant="h5" sx={{ mb: 0.5 }}>
                    Welcome back
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                    Log in to continue
                </Typography>

                <Box component="form" onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        {error ? <Alert severity="error">{error}</Alert> : null}

                        <TextField
                            label="Email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={submitting}
                            fullWidth
                            sx={{ py: 1.2 }}
                        >
                            {submitting ? "Logging in..." : "Log in"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}
