import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { hasToken } from '../../services/auth.service'
import MyInput from '../../components/MyInput'

import './index.scss'
import { userService } from '../../services/user.service'
import { User } from '../../models/user'

export default function EditUserPage() {
    
    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    
    React.useEffect(() => {
        userService.getById(Number(id)).then( user => {
            setName(user.name)
            setUsername(user.username)
        }).catch((error: Error) => {
            if (error.cause === 404) {
                alert('Usuário não existe!')
                navigate(-1)
            } else {
                alert('Usuário não logado!')
                navigate('/login')
            }
        })
    }, [])

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === null || name.trim() === '') {
            alert('Nome do usuário é obrigatório')
            return
        }

        const user: User = { id: Number(id), name, username }

        userService.update(user).then(saved => {
            goBack()
        }).catch(error => {
            alert('Sua sessão expirou!')
            navigate('/login')
        })
    }

    return (
        <div className='user-page'>
            <header>Usuário Id: {id}</header>
            
            <main style={{ height: 100 }}>
                <MyInput id='name' label='Nome' value={name} change={setName} />
                <MyInput id='username' label='Login' value={username} />
            </main>

            <footer>
                <button className='goBack' onClick={goBack}>Cancelar</button>
                <button onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}