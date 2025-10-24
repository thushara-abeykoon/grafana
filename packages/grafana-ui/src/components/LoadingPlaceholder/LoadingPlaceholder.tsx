import { css, cx } from '@emotion/css';
import * as React from 'react';
import { HTMLAttributes } from 'react';

import { GrafanaTheme2 } from '@grafana/data';

import CustomSpinner from '../../../../../public/app/core/components/CustomSpinner/CustomSpinner';
import { useStyles2 } from '../../themes';

/**
 * @public
 */
export interface LoadingPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  text: React.ReactNode;
}

/**
 * @public
 */
export const LoadingPlaceholder = ({ text, className, ...rest }: LoadingPlaceholderProps) => {
  const styles = useStyles2(getStyles);
  return (
    <div className={cx(styles.container, className)} {...rest}>
      <CustomSpinner />
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css({
      marginBottom: theme.spacing(4),
    }),
  };
};
