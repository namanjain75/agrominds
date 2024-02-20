document.addEventListener("DOMContentLoaded", fetchData);
    
    function fetchData() {
            setInterval(async () => {
                const apiKey = "ZKKI4TRB3XMG63AU";
            const channelId = "2401895";
            const fieldSoilMoisture = "Soil MoistureE";
            const fieldTemperature = "Temperature";
            const fieldHumidity = "Humidity";
            

                try {
                    const response = await fetch(`https://api.thingspeak.com/channels/${channelId}/feeds/last.json?api_key=${apiKey}`);
                    const data = await response.json();
                    console.log(data);

                    document.getElementById("temperature").textContent = `Temprature: ${data.field1 || "N/A"}`;
                    document.getElementById("humidity").textContent = `Humidity: ${data.field2 || "N/A"}`;
                    document.getElementById("soilMoisture").textContent = `Soil Moisture: ${data.field3 || "N/A"}`;
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }, 10000); // 10 seconds interval
        }
