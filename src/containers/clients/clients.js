import React, { lazy, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ClientsList from './components/clients-list'
import './styles/clients.scss'
import {
    clientsLoad,
    clientsRegister,
} from '../../redux/clients/clients.action'
import ClientModal from './components/client-modal'

const ClientsChart = lazy(() => import('./components/clients-chart'))
export default function Clients() {
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const { clients } = useSelector(state => state.ClientsReducer)
    useEffect(() => {
        dispatch(clientsLoad())
    }, [dispatch])

    const handleToggleModal = () => setModal(!modal)
    const hanndleSave = data => dispatch(clientsRegister(data))
    return (
        <div className="clients">
            <ClientsChart data={clients} />
            <ClientsList data={clients} />
            <div className="clients-iconadd ripple">
                <span className="material-icons" onClick={handleToggleModal}>
                    add
                </span>
            </div>
            <ClientModal
                open={modal}
                handleClose={handleToggleModal}
                handleSave={hanndleSave}
            />
        </div>
    )
}
