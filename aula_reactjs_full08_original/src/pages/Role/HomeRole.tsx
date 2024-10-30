import React from 'react'
import { useNavigate } from 'react-router-dom'

import { removeLoggedUser } from '../../services/auth.service'
import { roleService } from '../../services/role.service'

import HeaderButton from '../../components/HeaderButton'
import { Role } from '../../models/role'

import './styles.scss'

export default function HomeRole() {

    const navigate = useNavigate()


    const [roles, setRoles] = React.useState<Role[]>([])

    function logOut() {
        removeLoggedUser()
        navigate('/login')
    }

    function fetchRoles() {
        roleService.getRoles()
            .then(list => setRoles(list))
            .catch(error => {
                alert('Sua sessão expirou!')
                navigate('/login')
            })
    }

    React.useEffect(() => {
        fetchRoles()
    }, [])


    function goBack() {
        navigate(-1)
    }
    function updateRole(id: number) {
        navigate(`/role/${id}/edit`)
    }

    function removeRole(id: number) {
        roleService.delete(id).then(isDeleted => {
            if (!isDeleted) alert('Role não encontrada')
            fetchRoles()
        })
    }

    function goToCreateRole() {
        navigate('/role/create')
    }

    return (
        <div className='page-home'>

            <div className="role-component">
                <header>
                    <HeaderButton text='Voltar' click={goBack} />
                    Roles Cadastradas
                    <HeaderButton text="Novo" click={goToCreateRole} />
                </header>

                <main>
                    {roles.map(role => (
                        <div key={role.name} className='list-item'>
                            <div>{role.description}</div>
                            <div>
                                <button className='editButton' onClick={() => updateRole(role.id!)}>Editar</button>
                                <button className='delButton' onClick={() => removeRole(role.id!)}>Remover</button>
                            </div>
                        </div>
                    ))}
                </main>
            </div>

        </div>
    )
}