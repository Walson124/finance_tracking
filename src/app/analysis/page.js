import { Box } from "@mui/material";
import { AnalysisMain } from "./analysis-main";

export const metadata = {
    title: 'Analysis',
    description: 'Analyze data',
}

export default function Analysis() {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '15px',
            }}
        >
            <AnalysisMain/>
        </Box>
    )
}