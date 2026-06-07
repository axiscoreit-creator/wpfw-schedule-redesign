# WPFW Schedule Redesign Prototype

A responsive accessibility-focused redesign prototype for the WPFW public radio schedule grid.

## Project Purpose

This project modernizes a legacy public radio schedule interface with improved readability, mobile usability, navigation, and program discovery.

The prototype was created as a pro bono/community-focused UX and front-end development case study.

## Key Improvements

- Clickable station logo returning users to the main site
- Dynamic weekly schedule heading
- Previous / Current / Next week navigation
- Responsive weekly schedule grid
- Today View for smaller screens
- Search by program, host, or category
- Program detail panel on desktop
- Mobile-friendly program popover
- Category-based color coding
- Larger, more readable typography
- Improved keyboard-accessible buttons
- Reduced dependence on legacy JavaScript patterns

## Technical Audit Findings

The original schedule interface showed several modernization opportunities:

- Fixed-width 900px layout
- Absolute-positioned schedule elements
- Small 10px base typography
- CSS transform scaling used for readability
- Non-clickable logo
- Week navigation dependent on page reloads
- Hover previews clipped by viewport edges
- WCAG contrast issues
- Missing legacy JavaScript files
- Exposed PHP notice in production output

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- GitHub Pages

## Project Structure

```text
wpfw-schedule-redesign/
├── assets/
│   └── wpfw_logo.png
├── css/
│   └── styles.css
├── data/
│   └── schedule.json
├── js/
│   └── app.js
├── index.html
├── .gitignore
└── README.md
Accessibility Goals

This prototype aims to improve usability for:

* Older listeners
* Volunteers managing or reviewing programming
* Mobile users
* Keyboard users
* Users with reduced vision
* Users who need clearer navigation and larger text

Current Features

Schedule Views

Users can switch between:

* Full Week View
* Today View

Search

Users can search by:

* Program title
* Host name
* Category

Program Details

Desktop users see details in a persistent side panel.

Mobile users receive a floating popover near the selected program card.

Live Demo

GitHub Pages link: https://axiscoreit-creator.github.io/wpfw-schedule-redesign/
Future Improvements

* Add Now Playing detection
* Add category filter buttons
* Highlight the current day
* Add current-time show highlighting
* Add program images
* Add before/after screenshots
* Add WCAG contrast validation notes
* Improve keyboard navigation flow
* Add ARIA labels and roles
* Connect schedule to a maintainable CMS or Google Sheet data source

Portfolio Note

This project demonstrates front-end development, accessibility review, UX modernization, responsive design, and technical auditing for a real-world nonprofit/public media use case.

Disclaimer

This is an independent redesign prototype created for educational, portfolio, and pro bono demonstration purposes. It is not an official WPFW production website.