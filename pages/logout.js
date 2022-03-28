import { useEffect } from "react";
import { cookies } from "./_app";
import { useRouter } from 'next/router'
export default function Logout() {
    const router = useRouter()
    const ISSERVER = typeof window === "undefined";
    useEffect(() => {
        if (!ISSERVER) {
            localStorage.clear();
            cookies.remove('userToken')
            router.push('/logIn')
        }
    }, [ISSERVER])


    return (
        <div>

        </div>
    )
}
