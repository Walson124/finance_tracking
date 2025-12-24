import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const session = cookies().get("session")?.value;

  if (!session) {
    redirect("/login");
  }

  // pick your default landing page after login
  redirect("/home");
}

// import React from "react";
// import { Box, Button } from "@mui/material";
// import { YtConverter } from "./tools/yt-converter";

// export default function Home() {
// 	return (
// 		<Box>
// 			<Box
// 				sx={{
// 					width: '100%',
// 				}}
// 			>
// 				<Box
// 					sx={{
// 						fontFamily: "'Inter', sans-serif",
// 						fontWeight: "bold",
// 						fontSize: "1000%",
// 					}}
// 				>
// 					Finance Tracker
// 				</Box>
// 				<Box
// 					sx={{
// 						fontFamily: "'Inter', sans-serif",
// 						fontWeight: "bold",
// 						fontSize: "200%",
// 						width: "90%",
// 						textAlign: "right",
// 					}}
// 				>
// 					... and some other tools for home use
// 				</Box>
// 			</Box>
// 			<Box
// 				sx={{
// 					mt: '3%',
// 					padding: '0.5rem',
// 				}}
// 			>
// 				<Box>
// 					<Button
// 						variant="contained"
// 						href="/input"
// 						sx={{
// 							fontFamily: "'Inter', sans-serif",
// 							fontWeight: "bold",
// 							fontSize: "200%",
// 							padding: '1rem 2rem',
// 							backgroundColor: 'transparent',
// 							border: '2px solid black',
// 							color: 'black',
// 							'&:hover': {
// 								backgroundColor: 'black',
// 								color: 'white',
// 							},
// 							textTransform: 'none',
// 						}}
// 					>
// 						Input Spending
// 					</Button>
// 					<Button
// 						variant="contained"
// 						href="/analysis"
// 						sx={{
// 							ml: '2rem',
// 							fontFamily: "'Inter', sans-serif",
// 							fontWeight: "bold",
// 							fontSize: "200%",
// 							padding: '1rem 2rem',
// 							backgroundColor: 'transparent',
// 							border: '2px solid black',
// 							color: 'black',
// 							'&:hover': {
// 								backgroundColor: 'black',
// 								color: 'white',
// 							},
// 							textTransform: 'none',
// 						}}
// 					>
// 						Analyze Spending
// 					</Button>
// 				</Box>
// 				<Box
// 					sx={{
// 						mt: '2rem',
// 					}}
// 				>
// 					<Button
// 						variant="contained"
// 						href="/tools"
// 						sx={{
// 							fontFamily: "'Inter', sans-serif",
// 							fontWeight: "bold",
// 							fontSize: "200%",
// 							padding: '1rem 2rem',
// 							backgroundColor: 'transparent',
// 							border: '2px solid black',
// 							color: 'black',
// 							'&:hover': {
// 								backgroundColor: 'black',
// 								color: 'white',
// 							},
// 							textTransform: 'none',
// 						}}
// 					>
// 						Convert some music
// 					</Button>
// 				</Box>
// 			</Box>
// 		</Box>
// 	);
// }
