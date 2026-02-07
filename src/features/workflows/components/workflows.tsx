'use client'
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useCreateWorkfloww, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";

export const WorkflowsList=()=>{
    const workflows = useSuspenseWorkflows();

    return(
        <div className="flex-1 justify-center flex items-center">

            {JSON.stringify(workflows.data,null,2)}
        </div>
    )
}

export const WorkflowsHeader=({disabled}:{disabled?:boolean})=>{
    const createWorkflow= useCreateWorkfloww()
    const {handleError,modal} = useUpgradeModal();
    const router = useRouter()

    const handleCreate =()=>{
        createWorkflow.mutate(undefined,{
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`)
            },
            onError:(error)=>{
                console.error(error);
                handleError(error);
            },
        });
    }
    return(
        <>
        {modal}
            <EntityHeader
                title="workflows"
                description="create and manage your workflows"
                onNew={handleCreate}
                newButtonLabel="New workflows"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />
            {}
        </> 
    )
};

export const WorkflowsContainer=({
    children
}:{
    children:React.ReactNode;
})=>{
    return(
        <EntityContainer
             header={<WorkflowsHeader/>}
            search={<></>}
            pagination={<></>}
        >
            {children}
        </EntityContainer>
    )
};

