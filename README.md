# Full-Stack Techinical Challenge

## Description
The overall goal of the technical challenge is for us to get an idea of how you approach tasks, your coding style, your organization skills, and your technical experience as a full-stack engineer in general.

We want to be sensitive of the time you spend working on this, so we have designed the technical challenge to be a simpler version of a task an engineer in this role would be assigned. After we review the assignment, we want to invite you back and set some time to [discuss how you would approach implementing additional features](#challenge-review-discussion).

## Tasks

### Overview
For this exercise, we want you to build a basic dashboard with two sections:
- A table to show users with part of their available data.
- A filters section to narrow down the users according to specific criteria.

This will require you to build a backend with a database to transform data and handle data requests; and a frontend to show the table and make the necessary requests.

> [!IMPORTANT]
> We encourage you to use our preferred tech stack **Vue.js** and **Laravel**. However, you are free to use any tools (languages, libraries, frameworks) available and are comfortable with.

### Backend
- Build migrations for the `USERS` and `ACTIVITY` tables.
  - `USERS` should have the following properties:
  ```ts
  id: number
  first_name: string
  last_name: string
  country: string // Country Code: 'US'
  created_at: date
  birthdate: string // Format: 'YYYY-MM-DD'
  avatar: string
  ```
  - `ACTIVITY` should have properties that represent `comment` and `post` activity of a given user. This will be used to get `comment_activity` and `post_activity` of a user in the current month and compared to the previous month.
- Fill tables with fake data.
  - `USERS`: Generate 100 rows.
  - `ACTIVITY`: Generate 1 to 3 months worth of rows for each user.
- Build models for the `USERS` and `ACTIVITY` tables.
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
      member_since: date,
      age: number,
      avatar: string,
      comment_activity: {
        current_month: number,
        trend: 'higher' | 'lower' | 'neutral' // Compared to last month.
      },
      post_activity: {
        current_month: number,
        trend: 'higher' | 'lower' | 'neutral' // Compared to last month.
      },
    }
  ]
  ```
  - Paginate the response and accept the following parameters to filter users. **Make changes to the dashboard `GET` response as you see fit.**
    - `country`
    - `age`
    - `comment_activity`
    - `post_activity`
    - `sort_by`
    - `page`
  - Make sure input validation, error handling, and security risks are taken into account.
- Create a way to get all the options available in database for `country` and send them as options for the filter input. **Only options available from the data should show.**
  - Do the same for `age`, `comment_activity` and `post_activity`. These are ranges, so the way to do this will not be the same.
- Create an auth middleware to handle requests using tokens.

### Frontend
> [!IMPORTANT]
> Remember, this is a backend-focused Full-Stack Engineering role. For this part of the challenge we are mostly interested in how the frontend is built to interact with the backend and checking some frontend best practices in areas like component and utility reusability, data fetching, et cetera. We have provided a basic design example for you to get an idea of how it might look, but the design can vary, especially if you use a component library. No need to spend too much time on matching a "pixel-perfect" design.

- Create the **dashboard** page with the following sections:
  - **Table**: Show the data from the `GET` request `/dashboard`.
    - Include the following columns:
      - **Name**: Full name with the `avatar` image prefixed.
      - **Age**
      - **Country**
      - **Member Since**: Date provided by `created_at`.
      - **Comment Activity**: Show the trend of the user's comment activity compared to last month. If the user has more than the previous, show current month's count in green; if less, show the current month's count in red; otherwise, show it in white.
      - **Post Activity**: Same as previous column for posts.
    - Add a **Sort By** select input to sort results by:
      - **Member Since**: Show this as the default sort. Newest to oldest.
      - **Comment Activity**: Highest to lowest for the current month.
      - **Post Activity**: Highest to lowest for the current month.

  - **Filters**: Show inputs to filter data in the table. The filters should be the following:
    - Select inputs for: **Country**
    - Range inputs for: **Age**, **Comment Activity**, **Post Activity**
   
#### Example
<img width="1440" alt="image" src="https://github.com/loadedgg/technical-challenge-full-stack/assets/47439212/da9373e3-9914-4df0-ab31-7419b0b6fb31">

## Challenge Review Discussion
Please prepare to discuss implementing the following features:
- Dynamic filtering options. Let's say we have users from different communities (`/dashboard/gaming`, `/dashboard/music`) and we want to show filters specific to their community.
- Add a filter to show the `comment_activity.trend` during different periods. (Compared to 3 months, 6 months, 12 months.)
- User authentication options, tokens and error handling.
- Pros, cons and implementation of state management in the frontend.
- Fetching data from third-party sources such as Spotify, Discord, and IGDB.
