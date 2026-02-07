import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


// hook to fetch all workflows using suspense

export const useSuspenseWorkflows=()=>{
    const trpc= useTRPC();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
};

// hook to create a new workfloww

export const useCreateWorkfloww=()=>{
    const queryClient = useQueryClient()
    const trpc = useTRPC()

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data)=>{
                toast.success(`workflow"${data.name}"created`);
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.infiniteQueryOptions()
                );
            },
            onError:(error)=>{
                toast.error(`failed to create workflows: ${error.message}`);
            },
        }),
    );
};