import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export const NavIcon = (props) => {
    return (
      <FontAwesome
        name={props.icon}
        size={32}
        color={props.isSelected ? 'cornflowerblue' : 'grey'}
      />
    );
};

NavIcon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};
