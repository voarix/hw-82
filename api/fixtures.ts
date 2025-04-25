import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }


  const [artist1, artist2] = await Artist.create(
    {
      name: "Eminem",
      image: "fixtures/Eminem.jpg",
      info: "aklsd"
    },
    {
      name: "Timberlake",
      image: "fixtures/Justin.jpg",
      info: "info2lkjl2"
    }
  );

  const [album1, album2, album3, album4] = await Album.create(
    {
      name: "Album 1",
      artist: artist1._id,
      date: 2022,
      image: 'fixtures/album1.jpg',
    },
    {
      name: "Album 2",
      artist: artist1._id,
      date: 2023,
      image: 'fixtures/album2.jpg',
    },
    {
      name: "Album 3",
      artist: artist2._id,
      date: 2021,
      image: 'fixtures/album3.jpg',
    },
    {
      name: "Album 4",
      artist: artist2._id,
      date: 2024,
      image: 'fixtures/album4.jpg',
    }
  );

  const [track1, track2, track3, track4, track5] = await Track.create(
    {
      name: "Track 1",
      album: album1._id,
      number: 1,
      duration: "4:00"
    },
    {
      name: "Track 2",
      album: album1._id,
      number: 2,
      duration: "4:15"
    },
    {
      name: "Track 3",
      album: album1._id,
      number: 3,
      duration: "4:00"
    },
    {
      name: "Track 4",
      album: album1._id,
      number: 4,
      duration: "4:00"
    },
    {
      name: "Track 5",
      album: album1._id,
      number: 5,
      duration: "4:00"
    },

    {
      name: "Track 6",
      album: album2._id,
      number: 1,
      duration: "4:00"
    },
    {
      name: "Track 7",
      album: album2._id,
      number: 2,
      duration: "4:00"
    },
    {
      name: "Track 8",
      album: album2._id,
      number: 3,
      duration: "4:00"
    },
    {
      name: "Track 9",
      album: album2._id,
      number: 4,
      duration: "3:55"
    },
    {
      name: "Track 10",
      album: album2._id,
      number: 5,
      duration: "4:00"
    },

    {
      name: "Track 11",
      album: album3._id,
      number: 1,
      duration: "3:50"
    },
    {
      name: "Track 12",
      album: album3._id,
      number: 2,
      duration: "4:00"
    },
    {
      name: "Track 13",
      album: album3._id,
      number: 3,
      duration: "4:00"
    },
    {
      name: "Track 14",
      album: album3._id,
      number: 4,
      duration: "3:55"
    },
    {
      name: "Track 15",
      album: album3._id,
      number: 5,
      duration: "4:00"
    },

    {
      name: "Track 16",
      album: album4._id,
      number: 1,
      duration: "3:30"
    },
    {
      name: "Track 17",
      album: album4._id,
      number: 2,
      duration: "4:15"
    },
    {
      name: "Track 18",
      album: album4._id,
      number: 3,
      duration: "4:00"
    },
    {
      name: "Track 19",
      album: album4._id,
      number: 4,
      duration: "4:00"
    },
    {
      name: "Track 20",
      album: album4._id,
      number: 5,
      duration: "4:00"
    }
  );

  await db.close();
};

run().catch(console.error);