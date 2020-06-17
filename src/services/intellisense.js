import axios from 'axios';


const intellisense = async (pattern) => {  
  // Base API endpoint
  const api = axios.create({
    baseURL: 'https://reference.intellisense.io/thickenernn/v1'
  });
  
  // Color Scheme
  const colorScheme = [
    '#884444', '#448844', '#444488', '#888844', '#448888', '#884488',
    '#bb0000', '#00bb00', '#0000bb', '#bbbb00', '#00bbbb', '#bb00bb'
  ];
  
  // Get all data and filter it down
  const response = await api('referencia');
  const rawData = response.data.current.data['pt2-scaled'];
  const sensorData = [];
  
  for (const key in rawData) {
    if (key.startsWith(pattern)) {
      
      // Zip the times and values arrays
      const sensorValues = rawData[key].times.map((t, i) => ({
        time: t,
        value: rawData[key].values[i]
      }));
      
      // Keep index of the last sensor reading
      const lastValueIndex = rawData[key].values.length - 1;
      
      // Find out the maximum value
      const maxValue = sensorValues.reduce((acc, b) => Math.max(acc, b.value), 0);
      
      // Save as a structure compatible with D3 multi line graph
      sensorData.push({
        key,
        values: sensorValues,
        last: rawData[key].values[lastValueIndex],
        max: maxValue,
        active: true
      });
      
      // Assign unique colours
      sensorData.forEach((e, i) => e.color = colorScheme[i]);
    }
  }
  
  return(sensorData)
} 

export default intellisense;
