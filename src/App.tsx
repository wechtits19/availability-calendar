import { useState } from 'react'
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
        <div>
            {editingHouse ? (
                <SelectHouse setHouse={setHouse} isClosable/>
            ) : !editing ? (
                <>
                    <MainCalendar house={house}
                                  setEditingHouse={setEditingHouse}/>
                    <button onClick={() => setEditing(true)}>Edit
                        Availability
                    </button>
                </>
            ) : house ?
                <EditAvailability house={house}/> :
                <SelectHouse setHouse={setHouse}/>
            }
        </div>
    </>
  )
}

export default App
