import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("users");
  } catch (error) {
    console.log("Collections were not present, skipping drop");
  }

  const john = new User({
    username: "John",
    password: "123",
    confirmPassword: "123",
    role: "user",
  });

  john.generateToken();
  await john.save();

  const jane = new User({
    username: "Jane",
    password: "123",
    confirmPassword: "123",
    role: "admin",
  });

  jane.generateToken();
  await jane.save();

  const [artist1, artist2] = await Artist.create(
    {
      name: "Eminem",
      image: "fixtures/Eminem.jpg",
      info: "aklsd",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Timberlake",
      image: "fixtures/Justin.jpg",
      info: "info2lkjl2",
      user: jane._id,
      isPublished: true,
    }
  );

  const [album1, album2, album3, album4] = await Album.create(
    {
      name: "Album 1",
      artist: artist1._id,
      date: 2022,
      image: "fixtures/album1.jpg",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Album 2",
      artist: artist1._id,
      date: 2023,
      image: "fixtures/album2.jpg",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Album 3",
      artist: artist2._id,
      date: 2021,
      image: "fixtures/album3.jpg",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Album 4",
      artist: artist2._id,
      date: 2024,
      image: "fixtures/album4.jpg",
      user: jane._id,
      isPublished: true,
    }
  );

  await Track.create(
    {
      name: "Track 1",
      album: album1._id,
      number: 1,
      duration: "4:00",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Track 2",
      album: album1._id,
      number: 2,
      duration: "4:15",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Track 3",
      album: album1._id,
      number: 3,
      duration: "4:00",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Track 4",
      album: album1._id,
      number: 4,
      duration: "4:00",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Track 5",
      album: album1._id,
      number: 5,
      duration: "4:00",
      user: john._id,
      isPublished: true,
    },

    {
      name: "Track 6",
      album: album2._id,
      number: 1,
      duration: "4:00",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Track 7",
      album: album2._id,
      number: 2,
      duration: "4:00",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Track 8",
      album: album2._id,
      number: 3,
      duration: "4:00",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Track 9",
      album: album2._id,
      number: 4,
      duration: "3:55",
      user: john._id,
      isPublished: true,
    },
    {
      name: "Track 10",
      album: album2._id,
      number: 5,
      duration: "4:00",
      user: john._id,
      isPublished: true,
    },

    {
      name: "Track 11",
      album: album3._id,
      number: 1,
      duration: "3:50",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Track 12",
      album: album3._id,
      number: 2,
      duration: "4:00",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Track 13",
      album: album3._id,
      number: 3,
      duration: "4:00",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Track 14",
      album: album3._id,
      number: 4,
      duration: "3:55",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Track 15",
      album: album3._id,
      number: 5,
      duration: "4:00",
      user: jane._id,
      isPublished: true,
    },

    {
      name: "Track 16",
      album: album4._id,
      number: 1,
      duration: "3:30",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Track 17",
      album: album4._id,
      number: 2,
      duration: "4:15",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Track 18",
      album: album4._id,
      number: 3,
      duration: "4:00",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Track 19",
      album: album4._id,
      number: 4,
      duration: "4:00",
      user: jane._id,
      isPublished: true,
    },
    {
      name: "Track 20",
      album: album4._id,
      number: 5,
      duration: "4:00",
      user: jane._id,
      isPublished: true,
    }
  );

  const artist3 = await Artist.create({
    name: "False Artist",
    image: "default.jpg",
    info: "Shhh... it's a secret",
    user: john._id,
    isPublished: false,
  });

  const album5 = await Album.create({
    name: "False Album",
    artist: artist3._id,
    date: 2025,
    image: "default.jpg",
    user: john._id,
    isPublished: false,
  });

  await Track.create(
    {
      name: "False Track 1",
      album: album5._id,
      number: 34,
      duration: "3:30",
      user: john._id,
      isPublished: false,
    },
    {
      name: "False Track 2",
      album: album5._id,
      number: 99,
      duration: "4:20",
      user: john._id,
      isPublished: false,
    },
    {
      name: "False Track 3",
      album: album5._id,
      number: 116,
      duration: "3:45",
      user: john._id,
      isPublished: false,
    });

  await db.close();
};

run().catch(console.error);