import Header from "./header"

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
			<body
				style={{ 
					margin:	0,
					backgroundColor:'lavender'
				}}
			>
				<Header />
				<main
					style={{ padding:'0.5rem'}}
				>
					{children}
				</main>
			</body>
		</html>
	)
}
