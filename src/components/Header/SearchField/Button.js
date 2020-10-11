import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

import { useStyles } from './SearchField.style';

export function Button(props) {
  const { children, className, disableHoverEffect = false, ...rest } = props;
  const classes = useStyles();

  return (
    <IconButton
      disableRipple
      className={clsx({
        [className]: true,
        [classes.button]: true,
        [`${classes.button}--disableHoverEffect`]: disableHoverEffect,
      })}
      {...rest}
    >
      {children}
    </IconButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disableHoverEffect: PropTypes.bool,
};
