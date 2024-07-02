# Full-Stack Techinical Challenge

## Description
The overall goal of the technical challenge is for us to get an idea of how you approach tasks, your coding style, your organization skills, and your technical experience as a full-stack engineer in general.

We want to be sensitive of the time you spend working on this, so we have designed the technical challenge to be a simpler version of a task an engineer in this role would be assigned. After we review the assignment, we want to invite you back and set some time to [discuss how you would approach implementing additional features](#challenge-review-discussion).

## Tasks

### Overview
For this exercise, we want you to build a basic dashboard with two sections:
- A table to show users with part of their available data.
- A filters section to narrow down the users according to specific criteria.

This will require you to build a backend to transform data and handle data requests; and a frontend to show the table and make the necessary requests. **Building a database should not be necessary for this exercise.**

> [!IMPORTANT]
> We encourage you to use our preferred tech stack **Vue.js** and **Laravel**. However, you are free to use any tools (languages, libraries, frameworks) available and are comfortable with.

### Backend
- Copy the `files/users.json` file into a new project to use as the data for the challenge.
- Create a `/dashboard` endpoint to `GET` the data the frontend's `/dashboard` page will request.
  - The endpoint must accept the following parameters:
    - `country`
    - `favorite_genre`
    - `age`
    - `comment_activity`
    - `post_activity`
    - `sort_by`
  - Make sure error handling and security risks are taken into account with the request.
- Create a schema for the `/dashboard` response which fits the data needed to show in the **dashboard** table columns.
  - Pay particular attention to the `comment_activity` and `post_activity` columns which will require you transform the data available in the `activity` property of a user in `files/users.json`. The array provides the comments and posts data for the last 6 months for that user.

### Frontend
> [!IMPORTANT]
> Remember, this is a backend-focused Full-Stack Engineering role. For this part of the challenge we are mostly interested in how the frontend is built to interact with the backend and checking some frontend best practices in areas like component and utility reusability, data fetching, et cetera. No need to spend too much time on "pixel-perfect" matching the design provided.

- Following the design provided in the `files/dashboard-design.png` file, create a **dashboard** page.
- Create the following **dashboard** sections.
  - **Table**: Show the data from the `GET` request `/dashboard`.
    - Include the following columns:
      - **Name**: Full name with the `avatar` image prefixed and the `display_name` in parenthesis.
      - **Age**
      - **Country**
      - **Member Since**: Date provided by `created_at`.
      - **Favorite Genre**: User's `favorite_genre`.
      - **Comment Activity**: Show the trend of the user's comment activity compared to last month. If the user has more than the previous, show current month's count in green; if less, show the current month's count in red; otherwise, show it in white.
      - **Post Activity**: Same as previous column for posts.
    - Add a **Sort By** select input to sort results by:
      - **Member Since**: Show this as the default sort. Newest to oldest.
      - **Comment Activity**: Highest to lowest.
      - **Post Activity**: Highest to lowest.

  - **Filters**: Show inputs to filter data in the table. The filters should be the following:
    - Select inputs for: **Country** and **Favorite Genre**
    - Range inputs for: **Age**, **Comment Activity**, **Post Activity**

## Challenge Review Discussion
Please prepare to discuss implementing the following features:
- Dynamic filtering depending on table data. For example, instead of having only a music community, we have a gaming community and a travel community. In those communities we want to replace `favorite_song` / `favorite_music_genre` with `favorite_game` / `favorite_game_genre` or `favorite_city` / `favorite_country`. What changes would need to be made?
- User authentication options, tokens and error handling.
- Pros, cons and implementation of state management in the frontend.
- Fetching data from third-party sources such as Spotify, Discord, and IGDB.