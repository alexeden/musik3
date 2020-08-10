export const controlBlockBackdrop = (backdropFilter: string) => ({
  backdropFilter: `${backdropFilter}`,
  bottom: '-2rem',
  content: '""',
  left: '-2rem',
  position: 'absolute',
  right: '-2rem',
  top: '-2rem',
});

export const roundButton = () => ({
  alignItems: 'center',
  backdropFilter: 'blur(10px) brightness(5%) saturate(50) hue-rotate(20deg)',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '50%',
  boxShadow: '0px 0px 0.5rem 1px rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  display: 'flex',
  fontFamily: 'MuseoModerno',
  fontSize: '1.25rem',
  fontWeight: '900',
  height: '100px',
  justifyContent: 'center',
  width: '100px',
  '&:hover': {
    backdropFilter: 'saturate(50) hue-rotate(-20deg)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.2)',
  },
  '&:active': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
});

export const squareButton = () => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  boxShadow: '0px 0px 0.5rem 1px rgba(255, 255, 255, 0.2)',
  padding: '0.5rem',

  '&:hover': {
    backdropFilter: 'saturate(50) hue-rotate(-20deg)',
    boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  '&:active': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
});
