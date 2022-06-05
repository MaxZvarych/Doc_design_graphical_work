// kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.001; do wget -q -O- ae7c219c4f03340e493730b6a7643b9b-1148985285.us-east-2.elb.amazonaws.com:3200; done"
const axios = require("axios");

const baseURL =
  "ae7c219c4f03340e493730b6a7643b9b-1148985285.us-east-2.elb.amazonaws.com:3200";

const startDDOSing = async () => {
  try {
    let responseData = await axios.get(baseURL);
    console.log(responseData);
    return responseData.data;
  } catch (e) {
    console.log(e);
  }
};

const startDDOSAttack = async () => {
  startDDOSing();
};

setInterval(startDDOSAttack, 1000);
