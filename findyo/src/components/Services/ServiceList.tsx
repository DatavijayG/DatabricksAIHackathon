import React from 'react';
import ServiceCard from './ServiceCard';
import { Service } from '../../types';
import './ServiceList.css';

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <div className="service-list">
      <h2>Support Resources</h2>
      {services.length > 0 ? (
        services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))
      ) : (
        <div className="no-services">
          <p>Finding gentle resources for you...</p>
        </div>
      )}
    </div>
  );
};

export default ServiceList;