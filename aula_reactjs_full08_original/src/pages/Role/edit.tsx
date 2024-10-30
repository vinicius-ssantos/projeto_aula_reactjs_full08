import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { hasToken } from '../../services/auth.service'
import MyInput from '../../components/MyInput'

import './index.scss'
import { roleService } from '../../services/role.service'
import { Role } from '../../models/role'

export default function EditRolePage() {
    
    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    
    React.useEffect(() => {
        roleService.getById(Number(id)).then( role => {
            setName(role.name)
            setDescription(role.description)
        }).catch((error: Error) => {
            if (error.cause === 404) {
                alert('Role não existe!')
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
            alert('Nome da role é obrigatório')
            return
        }

        const role: Role = { id: Number(id), name, description }

        roleService.update(role).then(saved => {
            goBack()
        }).catch(error => {
            alert('Sua sessão expirou!')
            navigate('/login')
        })
    }

    return (
        <div className='role-page'>
            <header>Role Id: {id}</header>
            
            <main style={{ height: 100 }}>
                <MyInput id='name' label='Nome' value={name} change={setName} />
                <MyInput id='description' label='Descrição' value={description} change={setDescription}   />
            </main>

            <footer>
                <button className='goBack' onClick={goBack}>Cancelar</button>
                <button onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}