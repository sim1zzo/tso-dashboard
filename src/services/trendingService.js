import moment from 'moment';

const generateConsistentRandomValue = (metric, timestamp, min, max) => {
  const seed = metric + timestamp;
  const random = Math.abs(Math.sin(seed.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0)));
  return min + (random * (max - min));
};

export const fetchTrendingData = (substationId, metrics, startDate, endDate) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [];
      let currentDate = moment(startDate);
      const endMoment = moment(endDate);

      while (currentDate.isSameOrBefore(endMoment)) {
        const point = {
          timestamp: currentDate.format('YYYY-MM-DD HH:mm:ss'),
        };

        metrics.forEach(metric => {
          const min = 0; // Sostituire con i valori minimi effettivi per ogni metrica
          const max = 100; // Sostituire con i valori massimi effettivi per ogni metrica
          point[metric] = generateConsistentRandomValue(metric, point.timestamp, min, max);
        });

        data.push(point);
        currentDate = currentDate.add(10, 'minutes');
      }

      resolve(data);
    }, 500);
  });
};