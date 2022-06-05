const description = (security) => `
This security is owned by ${security.documentOwner} <br> 
It's level of risk : ${security.levelOfRisk}<br> 
It's trend of bidding : ${security.biddingTrend}<br> 
It's price: ${security.price}`;

export default description;
