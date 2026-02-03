import { requireAuth } from "@/lib/auth-utils";

const Page =async()=>{
    await requireAuth()
    return(
        <p>credentiels</p>
    )
};

export default Page;