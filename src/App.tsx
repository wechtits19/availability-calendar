import {useState} from 'react'
import './App.css'
import {SelectHouse} from "./SelectHouse.tsx";
import MainCalendar from "./MainCalendar.tsx";
import EditAvailability from "./EditAvailability.tsx";

function App() {
    const [editing, setEditing] = useState<boolean>(false);
    const [editingHouse, setEditingHouse] = useState<boolean>(false);
    const [house, setHouse] = useState<number | undefined>(undefined);

    return (
        <>
            <div className='h-full'>
                {editingHouse ? (
                    <SelectHouse setHouse={setHouse} isClosable
                                 close={() => setEditingHouse(false)}
                                 house={house}/>
                ) : !editing ? (
                    <>
                        <div className='h-5/6'>
                            <MainCalendar house={house}
                                          setEditingHouse={setEditingHouse}/>
                        </div>
                        <div className='h-1/6 content-center'>
                            <button onClick={() => setEditing(true)}>Edit
                                Availability
                            </button>
                        </div>
                    </>
                ) : house ?
                    <EditAvailability house={house} close={()=>{
                        setEditing(false);
                    }}/> :
                    <SelectHouse setHouse={setHouse}
                                 close={() => setEditingHouse(false)}/>
                }
            </div>
        </>
    )
}

export default App
