'use client'
import { Button } from "@/components/ui/button";
// import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
// import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const Page= ()=>{
  const trpc= useTRPC()
  const queryClient = useQueryClient()
  // await requireAuth()

  const {data} = useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success("job queued")
    }
  }))

  return(
    <div className="min-h-screen min-w-screen flex items center justify-center">
        protected server components
        <div>
          {JSON.stringify(data,null,2)}
        </div>
        <Button onClick={()=>create.mutate()} disabled={create.isPending}>
          create Workflow
        </Button>
    </div>
  )
}

export default Page