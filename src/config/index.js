const config = {
  general: {
    logging: process.env.REACT_APP_ENABLE_LOGGING || process.env.NODE_ENV !== 'production',
  },
  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  },
};

export default config;
