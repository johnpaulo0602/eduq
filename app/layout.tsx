import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { AuthProvider } from '@/providers/auth'

export const metadata: Metadata = {
    title: {
        template: '%s | EduQ - Banco de Provas',
        default: 'EduQ - Banco de Provas',
    },
};
const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br">
            <body className={nunito.variable}>
                <AuthProvider>
                    <ProviderComponent>{children}</ProviderComponent>
                </AuthProvider>
            </body>
        </html>
    );
}
