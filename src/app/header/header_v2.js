"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Menu, MenuItem } from "@mui/material";

const navItems = [
    { label: "Home", href: "/home" },
    { label: "Add", href: "/input" },
    { label: "Plan", href: "/plan" },
    { label: "Trends", href: "/analysis" },
    { label: "Goals", href: "/goals" },
    { label: "Tools", href: "/tools" },
];

export default function HeaderV2() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        fetch('/api/proxy/auth/me')
            .then(r => r.ok ? r.json() : null)
            .then(data => { if (data?.user?.email) setUserEmail(data.user.email); })
            .catch(() => {});
    }, []);

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.replace('/login');
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    width: "100%",
                    mb: "15px",
                    borderRadius: "15px",
                    minHeight: "25px",
                    p: "5px 10px 5px 10px",
                    backgroundColor: "rgb(20, 20, 20)",
                    display: "flex",
                    flexDirection: "row",
                    color: "rgb(214, 214, 214)",
                    border: "0.5px solid rgb(66, 66, 66)",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                {/* Left: brand */}
                <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        aria-controls={open ? "nav-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        component="img"
                        src="/assets/logo.png"
                        alt="logo"
                        sx={{ height: 40, display: { xs: "block", md: "none" }, cursor: "pointer" }}
                    />
                    <Box component={Link} href="/home" sx={{ display: { xs: "none", md: "block" }, cursor: "pointer" }}>
                        <Box component="img" src="/assets/logo.png" alt="logo" sx={{ height: 40, display: "block" }} />
                    </Box>
                    <Box component={Link} href="/home" sx={{ textDecoration: "none", color: "inherit", fontSize: "150%", cursor: "pointer" }}>
                        Finance Tracker
                    </Box>
                </Box>

                {/* Middle: full nav on md+ */}
                <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 2, justifyContent: "center", gap: 2, fontSize: "110%" }}>
                    {navItems.map((item) => (
                        <Box key={item.href} component={Link} href={item.href} sx={{ textDecoration: "none", color: "inherit" }}>
                            {item.label}
                        </Box>
                    ))}
                </Box>

                {/* Right: user pill + logout */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
                    <Box
                        sx={{
                            backgroundColor: "rgb(66, 66, 66)",
                            px: 1.25,
                            py: 0.25,
                            borderRadius: "10px",
                            fontSize: "0.85rem",
                            maxWidth: "160px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {userEmail || "Loading..."}
                    </Box>
                    <Box
                        onClick={handleLogout}
                        sx={{
                            cursor: "pointer",
                            backgroundColor: "rgb(50, 50, 50)",
                            px: 1.25,
                            py: 0.25,
                            borderRadius: "10px",
                            fontSize: "0.85rem",
                            border: "0.5px solid rgb(90,90,90)",
                            "&:hover": { backgroundColor: "rgb(70,70,70)" },
                        }}
                    >
                        Logout
                    </Box>
                </Box>

                {/* Dropdown menu for xs/sm */}
                <Menu
                    id="nav-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    PaperProps={{
                        sx: {
                            mt: 1,
                            bgcolor: "rgb(20,20,20)",
                            color: "rgb(214,214,214)",
                            border: "0.5px solid rgb(66,66,66)",
                            borderRadius: 2,
                            minWidth: 180,
                        },
                    }}
                >
                    {navItems.map((item) => (
                        <MenuItem key={item.href} component={Link} href={item.href} onClick={() => setAnchorEl(null)} sx={{ color: "inherit" }}>
                            {item.label}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={handleLogout} sx={{ color: "inherit" }}>Logout</MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
