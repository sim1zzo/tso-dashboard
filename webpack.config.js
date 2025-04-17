const path = require('path');

module.exports = {
  // Altre configurazioni...
  resolve: {
    fallback: {
      url: require.resolve('url/'),
    },
  },
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve file statici da 'dist'
    setupMiddlewares: (middlewares, devServer) => {
      // Esempio di middleware personalizzato
      if (devServer) {
        devServer.app.get('/api/data', (req, res) => {
          res.json({ data: 'example' });
        });
      }

      return middlewares; // Ritorna i middleware modificati o estesi
    },
    port: 9000, // Specifica la porta del server
  },
};
