import cors from 'cors';

export const corsConfig = cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
});
