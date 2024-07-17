# Full-Stack Techinical Challenge

## Description
The overall goal of the technical challenge is for us to get an idea of how you approach tasks, your coding style, your organization skills, and your technical experience as a full-stack engineer in general.

We want to be sensitive of the time you spend working on this, so we have designed the technical challenge to be a simpler version of a task an engineer in this role would be assigned. After we review the assignment, we want to invite you back and set some time to [discuss how you would approach implementing additional features](#challenge-review-discussion).

## Tasks

### Overview
For this exercise, we want you to build a basic dashboard that shows a list of users with data about their country and their comment activity which represents the amount of comments made today and the trend which compares the amount of comments to the previous day. The dashboard should have two sections:
- A table to show users with part of their available data.
- A filters section to narrow down the users according to specific criteria.

This will require you to build a backend with a database of your choice to transform data and handle data requests; and a frontend to show the table and make the necessary requests.

> [!IMPORTANT]
> We encourage you to use our preferred tech stack **Vue.js** and **Laravel**. However, you are free to use any tools (languages, libraries, frameworks) available and are comfortable with.

### Backend
- Build migrations for the `USERS` and `COMMENTS` tables.
  - `USERS` should have the following properties:
  ```ts
  id: number
  first_name: string
  last_name: string
  country: string // For this exercise limit the options to: ['US', 'MX', 'CA']
  created_at: date
  avatar: string
  ```
  - `COMMENTS` should have the following properties:
  ```ts
  id: number
  user_id: number
  content: string
  created_at: date
  ```
- Fill tables with fake data.
  - `USERS`: Generate 30 users.
  - `COMMENTS`: Generate one week's worth of data for each user.
- Build models for the `USERS` and `COMMENTS` tables.
- Create a dashboard `GET` request to return all the users with the following properties:
  ```ts
  [
    {...},
    {
      id: number,
      name: string,
      country: {
        code: string,
        name: string
      },
      avatar: string,
      comment_activity: {
        comments_today: number,
        trend: 'higher' | 'lower' | 'neutral' // Compared to the previous day.
      },
    }
  ]
  ```
  - Paginate the response and accept the following parameters to filter users. **Make changes to the dashboard `GET` response as you see fit.**
    - `country`
    - `comment_activity_trend`
    - `sort_by`
    - `page`
  - Make sure input validation, error handling, and security risks are taken into account.

### Frontend
> [!IMPORTANT]
> Remember, this is a backend-focused Full-Stack Engineering role. For this part of the challenge we are mostly interested in how the frontend is built to interact with the backend and checking some frontend best practices in areas like component and utility reusability, data fetching, et cetera. We have provided a basic design example for you to get an idea of how it might look, but the design can vary, especially if you use a component library. No need to spend too much time on matching a "pixel-perfect" design.

- Create the **dashboard** page with the following sections:
  - **Table**: Show the data from the `GET` request `/dashboard`.
    - Include the following columns:
      - **Name**: Full name with the `avatar` image prefixed.
      - **Country**
      - **Comment Activity**: Show the trend of the user's comment activity compared to last day. If the user has more than the previous, show current day's count in green; if less, show the current day's count in red; otherwise, show it in white.
    - Add a **Sort By** select input to sort results by:
      - **Member Since**: Show this as the default sort. Newest to oldest users.
      - **Comment Activity**: Highest to lowest comment couunt for the current day.

  - **Filters**: Show select inputs to filter data in the table. The filters should be the following:
    - **Country**: Use the three countries from the backend (`United States of America`, `Mexico`, `Canada`). 
    - **Comment Activity Trend**: Use the `comment_activity.trend` values (`Higher`, `Lower`, `Neutral`). 
   
#### Example
<img width="1485" alt="image" src="https://github.com/loadedgg/technical-challenge-full-stack/assets/47439212/5777e0b0-8113-4067-9bda-210f69a9d8d4">

## Challenge Review Discussion
Please prepare to discuss implementing the following features:
- Dynamic filtering options. Let's say we have users from different communities (`/dashboard/gaming`, `/dashboard/music`) and we want to show filters specific to their community.
- Add a filter to show the `comment_activity.trend` during different periods. (Compared to 1 week and 1 month ago.)
- User authentication options, tokens and error handling.
- Pros, cons and implementation of state management in the frontend.
- Fetching data from third-party sources such as Spotify, Discord, and IGDB.
- Returning filter options depending on available data in database. (Countries, Minimum Comments, Maximum Comments, et cetera.)