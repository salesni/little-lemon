
const fetchData = async (date) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          let result = [];

          //result.push("--- Select a Time ---")

          for (let hour = 15; hour <= 23; hour++) {
              if (Math.random() < 0.5) result.push(hour + ':00');
              if (Math.random() < 0.5) result.push(hour + ':30');
          }

          resolve(result);
      }, 1000); // Simulating a delay of 1 second (1000 milliseconds)
  });
}

  
  const submitAPI = async (formData) =>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(formData);
      }, 1000);
    });
  }

  const fakeAPI = {
    fetchData: fetchData,
    submitAPI: submitAPI,
  }
  
  export default fakeAPI;