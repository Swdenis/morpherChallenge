import React, { useEffect, useState } from 'react'
import { Button, Container, Header } from 'semantic-ui-react'
import { getCurrentNumber, handleIncrement, handleReset } from './requestHandlers'

export default function Home() {

    const [number, setNumber] = useState(0)

    useEffect( () => {
        getCurrentNumber(setNumber)
    }, [number])

    return(
        <Container 
        text
        textAlign='center'
        vertical
        >
            <Header
            as='h1'
            className='challengeHeader'
            >
                Morpher Coding Challenge
            </Header>
            <Header 
            as='h4'
            className='currentNumber'
            content={`Current number: ${number}`}
            />
            <Container style={{marginTop:"2em"}}>
                <Button positive content="Increment" onClick={()=>handleIncrement(setNumber)}/>
                <Button negative content="Reset" onClick={()=>handleReset(setNumber)}/>
            </Container>  
        </Container>)
}