import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import IconHome from '../icon/icon-home';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleNavigation = (path?: string) => {
        if (path && isClient) {
            router.push(path);
        }
    };

    return (
        <div className="mb-5">
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark">
                {items.map((item, index) => (
                    <li key={index} className={index !== 0 ? "before:content-['/'] before:px-1.5" : ""}>
                        <button
                            type="button"
                            onClick={() => handleNavigation(item.path)}
                            className={`hover:underline ${item.path ? "text-primary hover:text-primary" : "text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70"}`}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Breadcrumb;