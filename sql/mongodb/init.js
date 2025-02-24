// MongoDB initialization script for bus_schedule database

// Switch to bus_schedule database
db = db.getSiblingDB('bus_schedule');

// Create collections
db.createCollection('stops');
db.createCollection('routes');
db.createCollection('schedule');

// Insert sample data
db.stops.insertMany([
    {
        name: 'Kesklinn',
        location: {
            type: 'Point',
            coordinates: [24.7536, 59.4370]  // MongoDB uses [longitude, latitude]
        },
        created_at: new Date()
    },
    {
        name: 'Ülemiste',
        location: {
            type: 'Point',
            coordinates: [24.7991, 59.4231]
        },
        created_at: new Date()
    },
    {
        name: 'Mustamäe',
        location: {
            type: 'Point',
            coordinates: [24.6869, 59.4076]
        },
        created_at: new Date()
    }
]);

db.routes.insertMany([
    {
        route_number: '1A',
        description: 'Kesklinn - Mustamäe',
        created_at: new Date()
    },
    {
        route_number: '2',
        description: 'Ülemiste - Kesklinn',
        created_at: new Date()
    },
    {
        route_number: '3B',
        description: 'Mustamäe - Ülemiste',
        created_at: new Date()
    }
]);

// Get the ObjectIds of inserted documents
var kesklinn = db.stops.findOne({name: 'Kesklinn'})._id;
var ulemiste = db.stops.findOne({name: 'Ülemiste'})._id;
var mustamae = db.stops.findOne({name: 'Mustamäe'})._id;

var route1A = db.routes.findOne({route_number: '1A'})._id;
var route2 = db.routes.findOne({route_number: '2'})._id;
var route3B = db.routes.findOne({route_number: '3B'})._id;

db.schedule.insertMany([
    {
        route_id: route1A,
        stop_id: kesklinn,
        arrival_time: '08:00',
        departure_time: '08:02',
        day_of_week: 1
    },
    {
        route_id: route1A,
        stop_id: mustamae,
        arrival_time: '08:15',
        departure_time: '08:17',
        day_of_week: 1
    },
    {
        route_id: route2,
        stop_id: ulemiste,
        arrival_time: '09:00',
        departure_time: '09:02',
        day_of_week: 1
    },
    {
        route_id: route2,
        stop_id: kesklinn,
        arrival_time: '09:20',
        departure_time: '09:22',
        day_of_week: 1
    },
    {
        route_id: route3B,
        stop_id: mustamae,
        arrival_time: '10:00',
        departure_time: '10:02',
        day_of_week: 1
    },
    {
        route_id: route3B,
        stop_id: ulemiste,
        arrival_time: '10:25',
        departure_time: '10:27',
        day_of_week: 1
    }
]);

// Create indexes
db.stops.createIndex({ location: '2dsphere' });
db.schedule.createIndex({ route_id: 1 });
db.schedule.createIndex({ stop_id: 1 });

// Example queries (can be run in mongosh):

// 1. Count of routes per stop with $match and $group
// db.schedule.aggregate([
//     { $lookup: { from: 'stops', localField: 'stop_id', foreignField: '_id', as: 'stop' } },
//     { $unwind: '$stop' },
//     { $match: { 'stop.location.coordinates.1': { $gt: 59.40 } } },
//     { $group: {
//         _id: { stop_id: '$stop_id', name: '$stop.name' },
//         route_count: { $addToSet: '$route_id' }
//     }},
//     { $project: {
//         _id: 0,
//         name: '$_id.name',
//         route_count: { $size: '$route_count' }
//     }},
//     { $limit: 5 }
// ])

// 2. Average time between arrival and departure
// db.schedule.aggregate([
//     { $lookup: { from: 'routes', localField: 'route_id', foreignField: '_id', as: 'route' } },
//     { $unwind: '$route' },
//     { $group: {
//         _id: { route_id: '$route_id', route_number: '$route.route_number' },
//         avg_stop_time: { 
//             $avg: {
//                 $subtract: [
//                     { $multiply: [
//                         { $subtract: [
//                             { $toInt: { $substr: ['$departure_time', 3, 2] } },
//                             { $toInt: { $substr: ['$arrival_time', 3, 2] } }
//                         ]},
//                         60
//                     ]},
//                     { $subtract: [
//                         { $toInt: { $substr: ['$departure_time', 0, 2] } },
//                         { $toInt: { $substr: ['$arrival_time', 0, 2] } }
//                     ]}
//                 ]
//             }
//         }
//     }},
//     { $match: { avg_stop_time: { $gt: 60 } } },
//     { $sort: { avg_stop_time: -1 } }
// ])

// 3. Stops with most frequent service
// db.schedule.aggregate([
//     { $lookup: { from: 'stops', localField: 'stop_id', foreignField: '_id', as: 'stop' } },
//     { $unwind: '$stop' },
//     { $group: {
//         _id: { stop_id: '$stop_id', name: '$stop.name' },
//         total_stops: { $sum: 1 },
//         unique_routes: { $addToSet: '$route_id' }
//     }},
//     { $project: {
//         _id: 0,
//         name: '$_id.name',
//         total_stops: 1,
//         unique_routes: { $size: '$unique_routes' }
//     }},
//     { $sort: { total_stops: -1 } },
//     { $limit: 3 }
// ])
