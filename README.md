# Project 4 - Spotify Clone

A music streaming app that allows users to discover, upload, and enjoy their favorite songs. Powered by Next.js 13.4, React, Stripe, Supabase, and Tailwind CSS.

## Table of Contents

- [Project 4 - Spotify Clone](#project-4---spotify-clone)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Usage](#usage)

## Description

Project 4 - Spotify Clone is a feature-rich music streaming app that allows users to explore, upload, and enjoy their favorite songs. Whether you're a music enthusiast or just looking for some great tunes, this app has you covered.

## Features

- **User Authentication**: Sign up with your email or GitHub account. A login popup appears if users click on play buttons or action buttons before logging in.

- **Your Library**: When authenticated, users can access their library, including uploaded songs, liked songs, and top tracks. Upload and like songs to populate your library.

- **Music Playback**: When a user clicks on a song to play, the app identifies the song's ID and its source (all songs, liked, or library). It generates a dynamic queue of songs to play in sequence.

- **Playback Controls**: Control music playback with features like play, pause, skip to the next or previous track, and adjust the volume. The track slider offers a dynamic view of the song's duration, with ascending duration on the left and descending duration on the right.

## Tech Stack

- [Next.js 13.4](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Stripe](https://stripe.com/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS (2023)](https://tailwindcss.com/)
- [React Hot Toast](https://github.com/timolins/react-hot-toast)
- [React Spinners](https://github.com/davidhu2000/react-spinners)
- [Radix UI React Slider](https://radix-ui.com/primitives/docs/slider)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Audio Player](https://github.com/justinmc/react-audio-player)
- [Uniqid](https://github.com/adamhalasz/uniqid)

## Usage

The app is designed to provide an intuitive and seamless music streaming experience. Here's how you can make the most of its features:

### User Authentication

- **Sign Up**: Users can sign up for the app using either their email or their GitHub account.
- **Log In Popup**: If a user tries to interact with play buttons or action buttons before logging in, a login popup will be triggered.

### Your Library

- **Library View**: When authenticated, users can access their library, which includes uploaded songs, liked songs, and top tracks.
- **Upload and Like**: Users can upload songs to their library and like their favorite songs.

### Music Playback

- **Playing Songs**: When a user clicks on a song to play, the app identifies the song's ID and its source (all songs, liked, or library).
- **Dynamic Queue**: Based on the source of the current song, the app generates a dynamic queue of songs to play in sequence.

### Playback Controls

- **Play, Pause, Skip**: Users can play, pause, and skip to the next or previous track.
- **Volume Control**: Control the volume of the music playback.
- **Dynamic Track Slider**: The track slider provides a dynamic view of the song's duration, with ascending duration on the left and descending duration on the right.

Feel free to explore the app, discover new music, and enjoy a seamless music streaming experience once you're logged in.


