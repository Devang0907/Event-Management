import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/Card';
import NavigationMenu from '../components/NavigationMenu';

function Home() {
    type eventType = {
        id: number,
        title: string,
        description: string,
        images: string[]
    }

    const [events, setEvents] = useState<eventType[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/events").then(
            (res) => {
                if (res.data) {
                    setEvents((values) => [...values,...res.data] );
                }
                console.log(events)
            }
        )
        .catch((err) => { console.error(err) });
    }, [])

    return (
        <>
        <NavigationMenu/>
        {
            events.map((event,index)=>{
               return <Card key={index} props={event}/>
            })
        }
        </>
    );
}

export default Home