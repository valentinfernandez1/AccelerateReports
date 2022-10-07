import Report from "../Models/Report.js";

export default {
  createReport: async (req, res, next) => {
    const {
      environments,
      macAddress,
      projectName,
      backendMicroservices,
      entities,
    } = req.body;

    const report = {
      generationDate: new Date(),
      macAddress,
      projectName,
      environments,
      backendMicroservices,
      entities,
    };

    try {
      const reportResult = await Report.create(report);
      return res.status(200).json(reportResult);
    } catch (err) {
      res.status(500);
    }
  },
  getReports: async (req, res, next) => {
    try {
      const reports = await Report.find().lean();

      res.status(200).json(reports);
    } catch (err) {
      res.status(500);
    }
  },

  getAllEnvirionments: async (req, res, next) => {
    let { from, to } = req.query;

    let baseObject = [
      { name: "GoogleCloud", amount: 0 },
      { name: "AWS", amount: 0 },
      { name: "Azure", amount: 0 },
    ];
    let reports;
    try {
      reports = await Report.find({
        generationDate: {
          $gte: from,
          $lt: to,
        },
      }).lean();
    } catch (err) {
      res.status(500);
    }

    if (!reports) return res.status(200).json(entityData);

    reports.forEach((report) => {
      report.environments.forEach((environment) => {
        environment == "GoogleProvider"
          ? baseObject[0].amount++
          : environment == "AWSProvider"
          ? baseObject[1].amount++
          : environment == "AzureProvider"
          ? baseObject[2].amount++
          : null;
      });
    });

    res.status(200).json(baseObject);
  },

  getAllMicroservices: async (req, res, next) => {
    let { from, to } = req.query;

    const baseMicroservices = [
      { name: "NodeJs - Express", amount: 0 },
      { name: "Python - Django", amount: 0 },
    ];

    let reports;
    try {
      reports = await Report.find({
        generationDate: {
          $gte: from,
          $lt: to,
        },
      }).lean();
    } catch (err) {
      res.status(500);
    }

    if (!reports) return res.status(200).json(entityData);

    reports.forEach((report) => {
      report.backendMicroservices.forEach((microservice) => {
        console.log(microservice);
        microservice.framework == "NodeJsExpress"
          ? baseMicroservices[0].amount++
          : microservice.framework == "PythonDjango"
          ? baseMicroservices[1].amount++
          : null;
      });
    });

    res.status(200).json(baseMicroservices);
  },
  getAllEntities: async (req, res, next) => {
    let { from, to } = req.query;

    from = new Date(from * 1);
    to = new Date(to * 1);

    let entityData = [
      { name: "Average of Atrributes", value: 0 },
      { name: "Average of Relations", value: 0 },
    ];

    let reports;
    try {
      reports = await Report.find({
        generationDate: {
          $gte: from,
          $lt: to,
        },
      }).lean();
    } catch (err) {
      res.status(500);
    }

    if (!reports) return res.status(200).json(entityData);

    let entityLength = 0;
    reports.forEach((report) => {
      entityLength = +report.entities.length;
      report.entities.forEach((entity) => {
        entityData[0].value = entityData[0].value + entity.amountAtributes;
        entityData[1].value = entityData[1].value + entity.amountRelations;
      });
    });
    entityData[0].value = entityData[0].value / entityLength;
    entityData[1].value = entityData[1].value / entityLength;

    res.status(200).json(entityData);
  },

  getTimeTable: async (req, res, next) => {
    let timeColum = [];

    let reports;
    try {
      reports = await Report.find().lean();
    } catch (err) {
      res.status(500);
    }

    reports.forEach((report) => {
      let actualDate = report.generationDate.toISOString().split("T")[0];

      let flag = 0;
      timeColum.forEach((element, index) => {
        if (element.dateReport != actualDate || flag == 1) {
          return;
        }
        element.value++;
        flag = 1;
      });

      if (flag == 0) {
        const newReport = { dateReport: actualDate, value: 1 };
        timeColum.push(newReport);
      }
    });

    timeColum.forEach((element) => {
      element.dateReport = new Date(element.dateReport).toUTCString();
    });

    res.status(200).json(timeColum);
  },
  getCapabilities: async (req, res, next) => {
    let { from, to } = req.query;

    let capabilities = [];

    let reports;
    try {
      reports = await Report.find({
        generationDate: {
          $gte: from,
          $lt: to,
        },
      }).lean();
    } catch (err) {
      res.status(500);
    }

    if (!reports) return res.status(200).json(entityData);

    reports.forEach((report) => {
      report.backendMicroservices.forEach((microservice) => {
        microservice.capabilities.forEach((capability) => {
          let flag = 0;
          capabilities.forEach((element) => {
            if (element.capabilityName != capability || flag == 1) {
              return;
            }
            element.amount++;
            flag = 1;
          });

          if (flag == 0) {
            const newCapability = { capabilityName: capability, amount: 1 };
            capabilities.push(newCapability);
          }
        });
      });
    });
    res.status(200).json(capabilities);
  },
};
