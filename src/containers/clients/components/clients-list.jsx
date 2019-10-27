import React from 'react';
import PropTypes from 'prop-types';
import ClientItem from './client-item';
import '../styles/clients.list.scss';
import empty from '../../../assets/images/empty-box.svg';

const EmptyList = ({ visible = false }) => (visible ? (
        <div className="clients-list__empty">
            <img src={empty} alt="empty data" />
            <p>No se han registrado clientes</p>
        </div>
    ) : null);

EmptyList.propTypes = {
  visible: PropTypes.bool.isRequired,
};
export default function ClientsList({ data = [] }) {
  return (
      <div className="clients-list">
          <h3>
                Listado de clientes
              <br />
              <small>
Se encontraron
{' '}
{data.length}
{' '}
resultados
</small>
            </h3>
          <EmptyList visible={data.length === 0} />
          <ul className="clients-list__list">
              {data.map((item) => (
                  <ClientItem key={`client-${item.id}`} {...item} />
                ))}
            </ul>
        </div>
  );
}
