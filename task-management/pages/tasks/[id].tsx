const Task =  ({
  params,

}: {
  params: {
    id: string;
  };
})=>{


    console.log('PARAMS: ', params)
    return ( `TAS ID ${params}`);
}

export default Task;