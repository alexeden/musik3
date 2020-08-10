import React from 'react';
import { createUseStyles, } from 'react-jss';
import { controlBlockBackdrop, } from './styles';

const Branding: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.headerWrapper}>
      <h1 className={`${styles.headerText}`}>musik</h1>
      <h1 className={`${styles.headerIcon}`}>3</h1>
    </div>
  );
};

const useStyles = createUseStyles({
  headerWrapper: {
    margin: '2rem',
    width: '210px',
    composes: [ 'relative', 'select-none', 'hidden', 'md:block', ],
    '&:before': { ...controlBlockBackdrop('blur(10px) brightness(5%) saturate(50) hue-rotate(-20deg)'), },
  },
  headerText: {
    bottom: '50%',
    fontSize: '4rem',
    fontWeight: '900',
    height: '0',
    left: '-60px',
    letterSpacing: '-1px',
    lineHeight: '0',
    position: 'absolute',
    textAlign: 'center',
    textShadow: '1rem 1px rgba(255, 255, 255, 0.4)',
    top: '50%',
    transform: 'rotate(-80deg)',
    width: '100%',
  },
  headerIcon: {
    bottom: '50%',
    fontSize: '16rem',
    fontWeight: '300',
    height: '0',
    left: '60px',
    lineHeight: '0',
    position: 'absolute',
    textShadow: '1px 1rem rgba(255, 255, 255, 0.4)',
    top: '50%',
    transform: 'rotate(10deg)',
  },
});

export default Branding;
