import { css, keyframes } from '@emotion/css';
import React from 'react';

export interface EntgraSpinnerProps {
  size?: 'small' | 'default' | 'large';
  spinning?: boolean;
  tip?: string;
  children?: React.ReactNode;
}

// Ant Design's exact animations
const rotate = keyframes({
  to: {
    transform: 'rotate(405deg)',
  },
});

const bounce = keyframes({
  to: {
    opacity: 1,
  },
});

const CustomSpinner: React.FC<EntgraSpinnerProps> = ({
  size = 'default',
  spinning = true,
  tip,
  children,
}) => {
  const getSizePixels = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 32;
      default:
        return 20;
    }
  };

  const getDotSize = () => {
    const baseSize = getSizePixels();
    return Math.max(2, baseSize * 0.45); // Approximately 9px for default size
  };

  const styles = {
    spinner: css({
      position: 'relative',
      display: 'inline-block',
      width: '100%',
    }),
    
    spinnerContainer: css({
      textAlign: 'center',
      opacity: spinning ? 1 : 0,
      transition: 'opacity 0.3s',
      pointerEvents: spinning ? 'none' : 'auto',
    }),
    
    spinnerNested: css({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 4,
    }),
    
    spinnerDot: css({
      position: 'relative',
      display: 'inline-block',
      fontSize: `${getSizePixels()}px`,
      width: '1em',
      height: '1em',
    }),
    
    spinnerDotSpin: css({
      transform: 'rotate(45deg)',
      animation: `${rotate} 1.2s infinite linear`,
    }),
    
    dotItem: css({
      position: 'absolute',
      display: 'block',
      width: `${getDotSize()}px`,
      height: `${getDotSize()}px`,
      backgroundColor: '#1890ff',
      borderRadius: '100%',
      transform: 'scale(0.75)',
      transformOrigin: '50% 50%',
      opacity: 0.3,
      animation: `${bounce} 1s infinite linear alternate`,
      
      '&:nth-of-type(1)': {
        top: 0,
        left: 0,
      },
      
      '&:nth-of-type(2)': {
        top: 0,
        right: 0,
        animationDelay: '0.4s',
      },
      
      '&:nth-of-type(3)': {
        right: 0,
        bottom: 0,
        animationDelay: '0.8s',
      },
      
      '&:nth-of-type(4)': {
        bottom: 0,
        left: 0,
        animationDelay: '1.2s',
      },
    }),
    
    spinnerText: css({
      marginTop: '8px',
      color: '#1890ff',
      fontSize: '14px',
    }),
    
    childrenContainer: css({
      position: 'relative',
      opacity: spinning ? 0.5 : 1,
      transition: 'opacity 0.3s',
      pointerEvents: spinning ? 'none' : 'auto',
      
      ...(spinning && {
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.5)',
          opacity: 1,
          transition: 'opacity 0.3s',
          pointerEvents: 'auto',
          zIndex: 1,
        },
      }),
    }),
    
    blur: css({
      filter: 'blur(0.5px)',
    }),
  };

  const renderSpinner = () => (
    <div className={css(styles.spinnerContainer, children && styles.spinnerNested)}>
      <span className={css(styles.spinnerDot, styles.spinnerDotSpin)}>
        <span className={styles.dotItem}></span>
        <span className={styles.dotItem}></span>
        <span className={styles.dotItem}></span>
        <span className={styles.dotItem}></span>
      </span>
      {tip && <div className={styles.spinnerText}>{tip}</div>}
    </div>
  );

  if (!spinning) {
    return <>{children}</>;
  }

  if (children) {
    return (
      <div className={styles.spinner}>
        <div className={css(styles.childrenContainer, spinning && styles.blur)}>
          {children}
        </div>
        {renderSpinner()}
      </div>
    );
  }

  return renderSpinner();
};

export default CustomSpinner;