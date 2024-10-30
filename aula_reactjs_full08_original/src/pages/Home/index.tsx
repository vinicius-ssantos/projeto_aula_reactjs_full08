import React from 'react'
import { useNavigate } from 'react-router-dom'

import { removeLoggedUser } from '../../services/auth.service'
import { userService } from '../../services/user.service'
import { roleService } from '../../services/role.service'

import HeaderButton from '../../components/HeaderButton'
import { User } from '../../models/user'
import { Role } from '../../models/role'

import './styles.scss'

export default function HomePage() {

    const navigate = useNavigate()

    const [users, setUsers] = React.useState<User[]>([])
    const [roles, setRoles] = React.useState<Role[]>([])

    function logOut() {
        removeLoggedUser()
        navigate('/login')
    }

    function fetchUsers() {
        userService.getUsers()
            .then(list => setUsers(list))
            .catch(error => {
                alert('Sua sessão expirou!')
                navigate('/login')
            })
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
        fetchUsers()
        fetchRoles()
    }, [])

    function updateUser(id: number) {
        navigate(`/user/${id}/edit`)
    }

    function removeUser(id: number) {
        userService.delete(id).then(isDeleted => {
            if (!isDeleted) alert('Usuário não encontrado')
            fetchUsers()
        })
    }

    function goToCreateUser() {
        navigate('/user/create')
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
    function goToHomeRole() {
        navigate('/home/role')
    }

    return (
        <div className='page-home'>

            <div className='user-component'>
                <header>
                    <HeaderButton text='Sair' click={logOut} />

                    Usuários Cadastrados

                    <HeaderButton text="Novo" click={goToCreateUser} />
                </header>

                <main>
                    { users.map(user => (
                        <div key={user.username} className='list-item'>
                            <div>{user.name}</div>
                            <div>{user.username}</div>
                            <div>
                                <button className='editButton' onClick={() => updateUser(user.id!)}>Editar</button>
                                <button className='delButton' onClick={() => removeUser(user.id!)}>Remover</button>
                            </div>
                        </div>
                    ))}
                </main>
            </div>

            <div className="role-component">
                <header>
                    <HeaderButton text="Roles Cadastradas" click={goToHomeRole} />
                </header>

                {/*<main>*/}
                {/*    {roles.map(role => (*/}
                {/*        <div key={role.name} className='list-item'>*/}
                {/*            <div>{role.description}</div>*/}
                {/*            <div>*/}
                {/*                <button className='editButton' onClick={() => updateRole(role.id!)}>Editar</button>*/}
                {/*                <button className='delButton' onClick={() => removeRole(role.id!)}>Remover</button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</main>*/}
            </div>

        </div>
    )
}