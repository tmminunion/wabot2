const { InstancesClient } = require("@google-cloud/compute").v1;

// Instantiates a client
const computeClient = new InstancesClient();

async function getPublicIp() {
  try {
    // Ganti dengan informasi yang sesuai dengan instance Anda
    const project = "nufat-eltijany";
    const zone = "asia-southeast2-a";
    const instanceName = "nufatcloud";

    // Construct request
    const request = {
      project: project,
      zone: zone,
      instance: instanceName,
    };

    // Run request
    const [response] = await computeClient.get(request);

    // Mendapatkan alamat IP publik dari metadata instance
    const networkInterfaces = response.networkInterfaces;
    if (networkInterfaces && networkInterfaces.length > 0) {
      const accessConfigs = networkInterfaces[0].accessConfigs;
      if (accessConfigs && accessConfigs.length > 0) {
        const publicIp = accessConfigs[0].natIP;
        console.log("Public IP:", publicIp);
        return publicIp;
      } else {
        console.error("No access configurations found for the instance.");
      }
    } else {
      console.error("No network interfaces found for the instance.");
    }
  } catch (err) {
    console.error("Error retrieving instance:", err);
  }
}

module.exports = {
  getPublicIp: getPublicIp,
};
