# Hikarime - Anime List

## Description

This project aims to create a dynamic website that enables users to manage custom anime lists in real time. Users will be able to create, update, and delete personalized anime lists, as well as add, modify, or remove individual anime entries from these lists.

The data is stored locally using `LocalStorage`, ensuring that all information remains on the user's device, and no personal data is collected or processed by the website.

We are using [AniList API GraphQL](https://anilist.gitbook.io/anilist-apiv2-docs) to fetch data from AniList.

## Installation and usage

1. Clone the repository using `git clone https://github.com/JCiroLo/anime-list.git`.
2. Create a `.env` file in the root directory and set the [environment variables](#environment-variables).
3. Run `yarn` or `npm install` to install the dependencies.
4. Run `yarn dev` or `npm run dev` to start the server.

## Environment variables

- **VITE_API_URL**: AniList API URL

## Resources

- **Anime Database**: [AniList API GraphQL](https://anilist.gitbook.io/anilist-apiv2-docs)
  API documentation for the anime database using GraphQL.
- **Icons Library**: [Tabler icon set](https://tabler.io/icons)
  A free collection of SVG icons for use in web applications.
- **Font**: [Lato font](https://fonts.google.com/specimen/Lato)
  Font used in the website.
- **UI Library**: [Material UI](https://mui.com/material-ui/getting-started)  
  Provides a rich set of UI components for React applications, enabling easy and customizable designs.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)  
  A small, fast, and scalable state management solution for React applications.
- **API Client**: [Apollo Client](https://www.apollographql.com/docs/react/)  
  A comprehensive state management library for GraphQL queries and caching in React applications.
- **Date Library**: [Day.js](https://day.js.org/)  
  A lightweight JavaScript library for parsing, manipulating, and formatting dates.
- **YouTube Component**: [Lite YouTube](https://github.com/justinribeiro/lite-youtube)  
  A lightweight YouTube component for embedding videos without negatively impacting page load performance.
- **Form Validation**: [React Hook Form](https://www.react-hook-form.com/)  
  A performant library for handling form state and validation in React.
- **Notification System**: [Notistack](https://notistack.com/)  
  A flexible notification library for React that makes it easy to show snackbars.
- **Utility Classnames**: [clsx](https://github.com/lukeed/clsx)  
  A tiny utility for constructing `className` strings conditionally.
- **Sanitization Library**: [DOMPurify](https://github.com/cure53/DOMPurify)  
  A library used to sanitize HTML and prevent XSS attacks.
- **Swiper Slider**: [Swiper.js](https://swiperjs.com/)  
  A powerful mobile-friendly slider for creating carousels and swipeable components.
- **Routing Library**: [React Router DOM](https://reactrouter.com/en/main)  
  A client-side routing library for React applications.

### Development tools

- TypeScript
- Vite



## Todo list

### Important features

- [ ] **Add Infinite Scroll Support**  
  Create a generic `InfiniteScroll` component to handle infinite scrolling for paginated data, optimizing for large lists.

- [ ] **Design Logo**  
  Create a unique and recognizable logo for branding the website.

- [ ] **Implement Lazy Loading for Images**  
  Add lazy loading functionality for images to enhance loading times and improve user experience, especially on slower connections.

- [ ] **Fix mobile experience**
  The website is not currently responsive on mobile devices.

### Nice to have features

- [ ] **Support Light Mode**  
  Implement a light theme option for the website, allowing users to switch between dark and light modes.

- [ ] **Implement Multilingual Support**  
  Build a dictionary to support multiple languages using custom hooks and global JSON files for translations.

- [ ] **Refactor AnimeCard Flyout**  
  Replace the custom popover in the `AnimeCard` component with the built-in MUI Popover to improve performance and reduce code complexity.

- [ ] **Enhance Loading Indicators**  
  Design and implement better loading spinners or skeletons to improve the visual experience during data fetching.

- [ ] **Enable Avatar Deletion on Long Press**  
  Implement functionality to delete avatars via long press, using a custom hook to manage the press duration.

- [ ] **Create Popover and Dialog Containers**  
  Develop reusable containers for popovers and dialogs to standardize the UI and improve code maintainability.

## Bugs

- [ ] **Fix Infinite Scroll Bug - Search component**  
  The infinite scroll component is not properly handling the fetching of the data.

  **Errors:**
  - Results are duplicated.
  - Page 2 is skipped.

  **How to replicate:**
  - Search for an anime.
  - Reload the page.
