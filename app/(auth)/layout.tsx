import React from 'react';

import { redirect } from 'next/navigation'
import { getCurrentUser } from "@/lib/session";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getCurrentUser();

    if(!session){
        return <div className="min-h-screen text-black dark:text-white-dark">{children} </div>;
        
    }

    redirect('/')

    
};

export default AuthLayout;
