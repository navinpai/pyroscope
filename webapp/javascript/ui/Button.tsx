import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import cx from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps {
  kind?: 'default' | 'primary' | 'secondary' | 'danger';
  /** Whether the button is disabled or not */
  disabled?: boolean;
  icon?: IconDefinition;

  children?: React.ReactNode;

  /** Buttons are grouped so that only the first and last have clear limits */
  grouped?: boolean;

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  // TODO
  // for the full list use refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
  type?: 'button' | 'submit';
  ['data-testid']?: string;

  ['aria-label']?: string;

  className?: string;

  id?: string;
  form?: React.ButtonHTMLAttributes<HTMLButtonElement>['form'];

  /** disable a box around it */
  noBox?: boolean;
}

export default function Button({
  disabled = false,
  kind = 'default',
  type = 'button',
  icon,
  children,
  grouped,
  onClick,
  id,
  className,
  form,
  noBox,
  ...props
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      data-testid={props['data-testid']}
      disabled={disabled}
      onClick={onClick}
      form={form}
      aria-label={props['aria-label']}
      className={cx(
        styles.button,
        grouped ? styles.grouped : '',
        getKindStyles(kind),
        className,
        noBox && styles.noBox,
        !icon && styles.noIcon
      )}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          className={children ? styles.iconWithText : ''}
        />
      ) : null}
      {children}
    </button>
  );
}

function getKindStyles(kind: ButtonProps['kind']) {
  switch (kind) {
    case 'default': {
      return styles.default;
    }

    case 'primary': {
      return styles.primary;
    }

    case 'secondary': {
      return styles.secondary;
    }

    case 'danger': {
      return styles.danger;
    }

    default: {
      throw Error(`Unsupported kind ${kind}`);
    }
  }
}
