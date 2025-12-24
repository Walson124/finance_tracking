import HeaderV2 from "./header/header_v2"

export const metadata = {
	title: {
		default: 'Finance Tracker',
		template: '%s | Finance Tracker',
	},
	description: 'Multi-user spending tracker',
}

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
		>
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body
				style={{
					margin: 0,
					// backgroundColor: '#e6e6fa'
					backgroundColor: 'rgba(13, 14, 17, 1)',
					padding: '15px',
				}}
			>
				<HeaderV2 />
				<main
					style={{ padding: '0rem' }}
				>
					{children}
				</main>
			</body>
		</html>
	)
}
