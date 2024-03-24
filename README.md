# Devan's Notes

The site is live at [Devan's Cat-alog 🐈](https://devans-catalog.netlify.app/). I've written some notes that explain how I would achieve something that I didn't implement / future improvements [here](https://devanpellow.notion.site/Simbase-Technical-Challenge-5b44c6e5def8471c87e55937e1e7ffa2)

# simbase-frontend-assigment

👋 Welcome to the Simbase Frontend Test Assignment!

## General Instructions

- Fork this repository to get started, and share it with **beikeni** (Alessandro Baccini) when you're finished.
- This repository uses React + ReactRouter v6 + Typescript + Tailwind CSS, these tools are mandatory.
- Some components are built using HeadlessUI, you can continue using it or replace it with another Tailwind-based library of your choice.
- You can use whatever 3rd party library you want to achieve any of the tasks detailed below.
- This excercise uses the [Cat API](https://www.thecatapi.com/). You will need to sign up to get an API key.
- Consult the [API Docs here](https://documenter.getpostman.com/view/5578104/2s935hRnak#intro). You will find a couple of endpoints already present in the app, but you will need to implement a couple more to complete the **Favorites** feature.
- Make sure to read this entire document before getting started, some bonus tasks might affect how you work on the main features.
- Before submitting the assignment write a brief explanation of your choices and any additional information you think is relevant.

## Briefing
<img width="1414" alt="sample" src="https://github.com/simbase-tech/frontend-test-assignment/assets/64857643/089211b5-c7b1-469a-941c-fd5dfe4132bb">
At the moment, when selecting a cat breed from the dropdown menu at the top, a corresponding list of photos is fetched and displayed. These photos, rendered within cards, have two buttons on them: a heart and an “X”. These buttons are now inactive.
Your goal is to implement the following features and improvements to the application, while using tailwind CSS to style the UI components.

## Features:

**The “Favorites” feature:**

- Allow users to toggle the favorite status on and off.
- The favorite status has to bee visible and toggleable from both the `Home` page and the `Favorites` page.
- The favorite status has to be propagated to the API.
- A confirmation modal has to be displayed when a user attempts to remove a favorite, only upon receiving this confirmation will the change be propagated to the API.
- If the user is on the `Favorites` page and the favorite status is removed from a picture, the list has to refresh without any further action.

**The “Limits” feature:**

- A component of your choice has to be placed next to the dropdown allowing the user to select how many pictures to display.
- The component can be a radio, a slider, or anything else that you think would offer a good user experience.
- The list of cards should refresh immediately if the limit is updated.

**The “Delete Card” feature:**

- In the `Home` page the cards have an additional button marked with an “X”.
- This button should remove the card on which it is on from the local state/cache.
- Removing a card, similarly to removing a favorite, also should be confirmed via a confirmation modal.
- This feature should only be present on the `Home` page.

## Improvements:

**Data Fetching & State**

- Implement some form of caching, you can use the tool of your choice. Some options are react-query, zustand, redux-toolkit/rtk-query, or even React context.

**Types**

- Introduce types across the application.

**Components**

- Create two confirmation modals on top of the `BaseModal` component:
  - Use one to confirm the deletion of a cat card from the `Home` page (local state).
  - Use the other one to confirm the removal of a favorite (local state & API).

**Style**

- Style the `BaseModal` component.
- Make the `Home` page and the `Favorites` page responsive. (desktop + mobile)
- Make the card buttons responsive (heart and “x”).

**Code Quality**

- Refactor the code of the `Home` page to be tidier and more readable.

## Bonus Tasks:

> [!TIP]
> We understand that some of these tasks can take up a lot of time. If a task is marked with a star, you have the option of explaining your approach in writing instead of implementing it.

- Make a custom button variant in the tailwind config file to standardize the card buttons.
- Implement generic types in the `BaseDropdown` component.
- Implement the confirmation modals so that they are rendered only when needed.
- Make the page multilingual (static elements only) ⭐
- Explain your approach to accessibility ⭐
- Write automated tests (use the tooling of your choice) ⭐
- Deploy website via a CDN (ex. AWS Cloudfront) ⭐
- Any additional UX improvements will be counted as bonus. These can be things like highlighting important details, adding animations that help the user focus on the right element, adding hover states, etc..

## Evaluation Criteria

At Simbase we try to walk the line between building solid products and delivering them within a reasonable time frame, always erring on the side of stability over speed of development.

We strive to write readable, modular, testable and well documented code that will make the life of those who will come after us (or ourselves 3 months later) easier. Through this assignment we hope to see how you can help us furthering this goal.

We normally don't encourage over-engineering, but if you wish to go overboard to illustrate how you would approach an issue in a production environment, by all means don't hold back.

## Feedback

Whether you're selected for the next stage or not, we'll provide feedback on your assignment. We're looking forward to seeing your work! 🚀
