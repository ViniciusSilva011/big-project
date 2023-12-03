import Header from "@/app/components/menu/Header"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
        </>
    )
}