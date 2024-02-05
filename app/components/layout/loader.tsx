import { useAppSelector } from '@/app/hooks';
import { selectIsLoading } from '@/app/store/loader-reducer';
import { Box, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';

function Loader() {
  const isLoading = useAppSelector(selectIsLoading);
  return (
    <>
      {isLoading && <Box sx={{
        background: 'rgba(236, 236, 236, 0.7)',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1500
      }}>
        <CircularProgress
          size={50}
          sx={{
            color: grey[700],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px'
          }}
        />
      </Box> }
    </>
  )
}

export default Loader;