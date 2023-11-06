export default function RandomTasks() {
    function insertRandomTasks() {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `task name ${crypto.randomUUID()}`,
                description: `task description ${crypto.randomUUID()}`
            })
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }
    return (
        <div>
            <button onClick={insertRandomTasks}> -&gt; Insert Random Task </button>
        </div >
    );
}