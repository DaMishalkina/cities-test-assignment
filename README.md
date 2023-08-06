# City Data Display Project

This project provides a backend and frontend solution for displaying information about cities using JSON data. The backend is built with Node.js and Express, and the frontend uses React to visualize the data in both table and map formats.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup](#setup)
- [Known Issues](#known-issues)
- [Future Enhancements](#future-enhancements)

## Introduction

This project is designed to fulfill the challenge of implementing a backend to serve JSON data and a frontend to display it. The backend returns city data via a REST API endpoint, and the frontend retrieves and presents this data through a table and a map.

## Features

- REST API backend built using Node.js and Express to serve JSON data.
- React frontend with interactive components written in TypeScript to display city data.
- Interactive map visualization using the react-deck-gl and react-map-gl libraries.
- City data in the table can be sorted by columns.
- Clicking on a city in the table highlights its location on the map.
- Integration with Mapbox for map rendering.

## Setup

Before running the project, make sure to provide your Mapbox access token as an environment variable:

```bash
REACT_APP_MAPBOX_TOKEN=<your-mapbox-token>
```

- To install necessary packages run `sh ./init.sh` from the root directory of the project.
- To run app execute `sh ./run.sh` from the root directory of the project.
- Backend should be running on http://localhost:8080
- Frontend should be running on http://localhost:3000

## Known Issues
During the development of this project, the following issue was encountered and addressed:
- **Map Component Resize Issue:** The map component did not resize properly when the window width changed.

## Future Enhancements
In the future, the following enhancements are planned for this project:

- Implementation of individual city pages using React Router.
- Retrieval and display of landmark data for each city.
- Further improvement of UI/UX design for a polished user experience.

