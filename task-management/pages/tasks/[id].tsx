import { useRouter } from "next/router";

const Task =  ({
  params,

}: {
  params: {
    id: string;
  };
})=>{



    
    
    const router = useRouter();
    
    // Get the query parameter from the URL
    const { id } = router.query;
    return ( `TAS ID ${id}`);
}

export default Task;