import Header from "@/app/components/menu/Header"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div className="min-h-screen">
                {children}
            </div>
        </>
    )
}