export const calculateAmountUsers = (reports) => {
  let users = [];
  reports.forEach((element) => {
    if (!element.macAddress) return;

    users.push(element.macAddress);
  });

  return [...new Set(users)].length;
};

export const calculateMeanG_Users = (reports) => {
  let users = [];
  let generations = {};
  reports.forEach((element) => {
    if (!element.macAddress) return;

    users.push(element.macAddress);
  });

  let sum = 0;
  users.forEach((user) => {
    if (generations[user]) {
      generations[user]++;
    } else {
      generations[user] = 1;
    }
    sum++;
  });

  return sum / Object.keys(generations).length;
};

export const calculateMeanG_Project = (reports) => {
  let users = [];
  let generations = {};
  reports.forEach((element) => {
    if (!element.macAddress || !element.projectName) return;

    users.push(`${element.macAddres}${element.projectName}`);
  });

  let sum = 0;
  users.forEach((user) => {
    if (generations[user]) {
      generations[user]++;
    } else {
      generations[user] = 1;
    }
    sum++;
  });

  return sum / Object.keys(generations).length;
};
