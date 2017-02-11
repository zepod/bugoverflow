const express = require('express');
const config = require('config');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

function initApp(cb) {
  const app = express();
  const port = config.port || 8080;

  app.disable('x-powered-by');

  if (config.clusters.shouldCluster) {
    if (cluster.isMaster) {
      console.log(`Master process "${process.pid}" is running`);
      if (config.clusters.clusterInstances === 'dynamic') {
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      } else {
        for (let i = 0; i < config.clusters.clusterInstances; i++) {
          cluster.fork();
        }
      }
      cluster.on('exit', (worker, code, signal) => cluster.fork());
    } else {
      app.listen(port, () => {
        console.log('===> Server is listening on port', port);
      });
    }
  } else {
    app.listen(port, () => {
      console.log('===> Server is listening on port', port);
    });
  }

  if (cb) cb();
  return app;
}
module.exports = initApp;
