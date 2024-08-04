import dbConnect from '@/utils/dbConnect'
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';
import TrafficCourt from '@/db-schemas/TrafficCourt';
import TrafficState from '@/db-schemas/TrafficState';
import TrafficCounty from '@/db-schemas/TrafficCounty';
import Violation from '@/db-schemas/Violation';
import Attorney from '@/db-schemas/Attorney';
import responseHandler from '@/utils/responseHandler';

const clearDatabase = async () => {
  await TrafficState.deleteMany({});
  await TrafficCounty.deleteMany({});
  await TrafficCourt.deleteMany({});
  await Violation.deleteMany({});
  await Attorney.deleteMany({});
};

const seedAttorney = async () => {
    const attorneys = [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          address: '123 Main St, Anytown, USA',
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '098-765-4321',
          address: '456 Elm St, Anytown, USA',
        },
      ];
    
    await Attorney.insertMany(attorneys);
}

const seedViolation = async () => {
    const violations = [
        {
          name: 'Speeding',
          points: 3,
        },
        {
          name: 'Running a red light',
          points: 2,
        },
        {
          name: 'Illegal U-turn',
          points: 1,
        }
      ];
    
    await Violation.insertMany(violations);
}

const seedTrafficState = async () => {
  const states = [
    {
      shortName: 'CA',
      longName: 'California',
      enabled: true,
    },
    {
      shortName: 'TX',
      longName: 'Texas',
      enabled: true,
    },
    {
      shortName: 'NY',
      longName: 'New York',
      enabled: true,
    },
    {
      shortName: 'FL',
      longName: 'Florida',
      enabled: true,
    },
  ];

  await TrafficState.insertMany(states);
};

const seedTrafficCounty = async () => {
  const states = await TrafficState.find();

  const counties = [
    {
      name: 'Los Angeles County',
      trafficState: states.find(state => state.shortName === 'CA')._id,
      shortName: 'LA',
      enabled: true,
    },
    {
      name: 'Harris County',
      trafficState: states.find(state => state.shortName === 'TX')._id,
      shortName: 'HC',
      enabled: true,
    },
    {
      name: 'New York County',
      trafficState: states.find(state => state.shortName === 'NY')._id,
      shortName: 'NYC',
      enabled: true,
    },
    {
      name: 'Miami-Dade County',
      trafficState: states.find(state => state.shortName === 'FL')._id,
      shortName: 'MD',
      enabled: true,
    },
  ];

  await TrafficCounty.insertMany(counties);
};

const seedTrafficCourt = async () => {
  const states = await TrafficState.find();
  const counties = await TrafficCounty.find();

  const courts = [
    {
      name: 'Los Angeles Traffic Court',
      address: '789 Court St, Los Angeles, CA',
      trafficCounty: counties.find(county => county.name === 'Los Angeles County')._id,
      trafficState: states.find(state => state.shortName === 'CA')._id,
      stateShortName: 'CA',
      enabled: true,
    },
    {
      name: 'Houston Traffic Court',
      address: '101 Court St, Houston, TX',
      trafficCounty: counties.find(county => county.name === 'Harris County')._id,
      trafficState: states.find(state => state.shortName === 'TX')._id,
      stateShortName: 'TX',
      enabled: true,
    },
    {
      name: 'Manhattan Traffic Court',
      address: '202 Court St, New York, NY',
      trafficCounty: counties.find(county => county.name === 'New York County')._id,
      trafficState: states.find(state => state.shortName === 'NY')._id,
      stateShortName: 'NY',
      enabled: true,
    },
    {
      name: 'Miami Traffic Court',
      address: '303 Court St, Miami, FL',
      trafficCounty: counties.find(county => county.name === 'Miami-Dade County')._id,
      trafficState: states.find(state => state.shortName === 'FL')._id,
      stateShortName: 'FL',
      enabled: true,
    },
  ];

  await TrafficCourt.insertMany(courts);
};

export default async function handler(req, res) {

  await dbConnect();

  try {
    console.log("clearing database before seeding ...");
    await clearDatabase();

    console.log("seeding attorney table ...")
    await seedAttorney();

    console.log("seeding violation table ...");
    await seedViolation();

    console.log("seeding traffic state table ...");
    await seedTrafficState();

    console.log("seeding traffic county table ...");
    await seedTrafficCounty();

    console.log("seeding traffic court table ...");
    await seedTrafficCourt();

    return responseHandler.success(200, { message: 'Database seeded successfully' }, res );
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
