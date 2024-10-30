import React from 'react'
import { useNavigate } from 'react-router-dom'

import { roleService } from '../../services/role.service'
import { hasToken } from '../../services/auth.service'
import { Role } from '../../models/role'

import MyInput from '../../components/MyInput'

import './index.scss'

export default function RolePage() {

    const navigate = useNavigate()

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')



    React.useEffect(() => {
        if (!hasToken()) {
            alert('Usuário não logado!')
            navigate('/login')
        }
    })

    function goBack() {
        navigate('/home')
    }

    function save() {
        if (name === null || name.trim() === '') {
            alert('Nome da role é obrigatória')
            return
        }
        if (description === null || description.trim() === '') {
            alert('Descrição da role é obrigatória')
            return
        }


        const role: Role = { name, description }

        roleService.create(role).then(saved => {
            alert('Role salvo com sucesso!')
            goBack()
        }).catch((error: Error) => {
            if (error.cause === 400) {
                alert('Role já existe')
            } else {
                alert('Sua sessão expirou!')
                navigate('/login')
            }
        })
    }

    return (
        <div className='role-page'>
            <header>Nova Role</header>
            
            <main>
                <MyInput id='name' label='Nome' value={name} change={setName} />
                <MyInput id='description' label='Descrição' value={description} change={setDescription} />
            </main>

            <footer>
                <button className='goBack' onClick={goBack}>Cancelar</button>
                <button onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}