# Secret Santa Game

## Overview

The Secret Santa Game is a React-based application that allows users to upload employee lists, generate secret Santa assignments while avoiding conflicts, and download the assignments as a CSV file.

## Features

- Upload current year employee list (CSV format).
- Generate random Secret Santa assignments.
- Ensure no employee is assigned to themselves.
- Download the assignments in CSV format.

## Installation

### Navigate to the project directory:

1. Unzip the project folder
2. Run the following command:

   cd secret-santa-game

### Install dependencies:

npm install
npm i papaparse
npm i lodash.shuffle
npm i file-saver

### Start the development server:

npm start

## Usage

1. Upload the current year employee file (CSV format) containing `Employee_Name` and `Employee_EmailID`.
2. Click on **Generate Assignments** to create Secret Santa pairs.
3. If assignments are successfully generated, download them as a CSV file.

## CSV File Format

### Employee List (Current Year)

| Employee Name | Employee Email ID      |
|--------------|------------------------|
| John Doe    | john@example.com        |
| Jane Smith  | jane@example.com        |

## Dependencies

- React
- papaparse (CSV parsing)
- file-saver (Downloading files)
- lodash.shuffle (Shuffling arrays)

## Folder Structure

```
secret-santa-game/
│── src/
│   ├── components/
│   │   ├── SecretSantaGame.js
│   ├── styles/
│   │   ├── SecretSanta.css
│── public/
│── package.json
│── README.md
```

