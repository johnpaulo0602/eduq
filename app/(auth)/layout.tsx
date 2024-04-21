import React from 'react';

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return <div className="min-h-screen text-black dark:text-white-dark">{children} </div>;
        
    }

    redirect('/')
    
};

export default AuthLayout;
