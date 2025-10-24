import { css } from '@emotion/css';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

// import { BouncingLoader } from '../components/BouncingLoader/BouncingLoader';
import CustomSpinner from '../components/CustomSpinner/CustomSpinner';

export function GrafanaRouteLoading() {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.loadingPage}>
      {/* <BouncingLoader /> */}
      <CustomSpinner />
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => ({
  loadingPage: css({
    backgroundColor: theme.colors.background.primary,
    flex: 1,
    flexDrection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
