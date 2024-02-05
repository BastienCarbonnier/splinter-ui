import { stringifyJson } from '@/app/utils/file.utils';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string
  file: IJsonFile
}

function FileDisplayJson({ file, title }: Props): JSX.Element {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box component="pre" sx={{ overflow: 'auto' }}>
        {stringifyJson(file)}
      </Box>
    </>
  )
}

export default FileDisplayJson;